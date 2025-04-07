import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, FlatList } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import { ProductCategory } from '../products/models/common/productCategoryEnum';

export default function AddOrder() 
{
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [price, setPrice] = useState(0);
    const [isPaid, setIsPaid] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [customerName, setCustomerName] = useState('');
    const [categoryId, setCategoryId] = useState(ProductCategory.Chizlog);
    const [product, setProduct] = useState({id : 0, name: ''});
    const [totalPrice, setTotalPrice] = useState(0.00);
    
    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await fetch('http://192.168.254.100:5114/api/ProductCategories');
            const data = await response.json();
            setCategories(data);
          } catch (error) {
            Alert.alert('Error', 'Failed to fetch categories');
          }
        };
    
        fetchCategories();
      }, []);

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await fetch(`http://192.168.254.100:5114/api/products?categoryId=${categoryId}`);
            const data = await response.json();
            setProducts(data);
          } catch (error) {
            Alert.alert('Error', 'Failed to fetch products');
          }
        };
    
        fetchProducts();
      }, [categoryId]);

    
    const handleAddOrderItems = async () => {
        if (!categoryId || !product.id || !price) {
            Alert.alert('Error', 'All fields are required');
            return;
        }
    
        const orderItem = {
          productId: product.id,
          quantity: quantity,
          price: price,
          productName: product.name
        };
    
        setOrderItems([...orderItems, orderItem]);
        setTotalPrice(totalPrice + (price * quantity));
        setPrice(0);
        Alert.alert('Success', 'Order item added successfully');
    }

    const PlaceOrder = async () => {
      if (!customerName ) {
        Alert.alert('Error', 'customer Name is required');
        return;
      }

      if (orderItems.length === 0) {
        Alert.alert('Error', 'Order items are required');
        return;
      }

      const order = {
        "order" : {
          "customerName": customerName,
          "isPaid" : isPaid,
          "orderItems": orderItems
        }
      };
    
      try {
        const response = await fetch('http://192.168.254.100:5114/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
        });
      
        if (response.ok) {
          Alert.alert('Success', 'Order added successfully');
        } else {
          Alert.alert('Error', 'Failed to add product');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred');
      }
    }

    const handleProductChange = async (id) => {
      const selectedProduct = products.find((p) => p.id == id);
      if (!selectedProduct) return;
      setPrice(selectedProduct.price.value);
      setProduct({id: id, name: selectedProduct.name });
    }

    const ClearOrder = async () => {
      setOrderItems([]); 
      setTotalPrice(0.00);
    }

    return (
        <View style={styles.container}>
            <Text>Add Order</Text>
            <TextInput
                  placeholder='Enter customer name'
                  style={styles.input}
                  value={customerName}
                  onChangeText={setCustomerName}
                />
            <Text style={styles.label}>Category:</Text>
            <Picker
              selectedValue={categoryId}
              style={styles.input}
              onValueChange={(itemValue) => setCategoryId(itemValue)}
            >
              {categories.map((category) => (
                <Picker.Item key={category.id} label={category.name} value={category.id} />
              ))}
            </Picker>
            <Text style={styles.label}>Product:</Text>
            <Picker
              selectedValue={product.id}
              style={styles.input}
              onValueChange={(itemValue) => handleProductChange(itemValue)}
            >
              {products.map((p) => (
                <Picker.Item key={p.id} label={p.name} value={p.id} />
              ))}
            </Picker>
            <Text>Price:</Text>
            <TextInput
                    style={styles.input}
                    placeholder="Enter price"
                    value={String(price)}
                    onChangeText={(text) => setPrice(Number(text))}
                    keyboardType="numeric"
                  />
            <TextInput
                style={styles.input}
                placeholder="Enter quantity"
                value={String(quantity)}
                onChangeText={(text) => setQuantity(Number(text))}
                keyboardType="numeric"
            />
            <Button title='Add Order' onPress={handleAddOrderItems} />
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={isPaid}
                onValueChange={setIsPaid}
              />
              <Text style={styles.label}>Is Paid</Text>
            </View>
            <FlatList
                data={orderItems}
                keyExtractor={(item) => item.productId.toString()}
                renderItem={({ item }) => (
                  <View style={styles.row}>
                    <Text style={styles.cell}>Product: {item.productName}</Text>
                    <Text style={styles.cell}>Quantity: {item.quantity}</Text>
                    <Text style={styles.cell}>Price: {item.price}</Text>
                  </View>
                )} />
            <Text>Total Price: {totalPrice}</Text>
            <Button title='Clear Order' onPress={ClearOrder} />
            <Button title='Place Order' onPress={PlaceOrder} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});