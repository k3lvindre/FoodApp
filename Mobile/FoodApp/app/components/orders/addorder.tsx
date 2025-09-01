import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../constants/api';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, FlatList, ScrollView } from 'react-native';
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
            const response = await fetch(`${BASE_URL}/ProductCategories`);
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
            const response = await fetch(`${BASE_URL}/products?categoryId=${categoryId}`);
            const data = await response.json();
            setProducts(data);
            setProduct({id: 0, name: ''});
          } catch (error) {
            Alert.alert('Error', 'Failed to fetch products');
          }
        };
    
        fetchProducts();
      }, [categoryId]);

    const handleDeleteOrderItems = async (index : number) => {
      const newOrderItems = [...orderItems];
      const [removedItem] = newOrderItems.splice(index, 1);
      setOrderItems(newOrderItems);
      setTotalPrice((prevtotalPrice) => prevtotalPrice - (removedItem.price * removedItem.quantity));
    }

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
        setTotalPrice((prevtotalPrice) => prevtotalPrice + (price * quantity));
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
          "dateCreated": new Date().toISOString(),
          "isPaid" : isPaid,
          "orderItems": orderItems
        }
      };
    
      try {
        const response = await fetch(`${BASE_URL}/orders`, {
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

    const handleProductChange = async (id: number) => {
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
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.headerText}>Add Order</Text>
                
                <View style={styles.formSection}>
                    <Text style={styles.label}>Customer Name</Text>
                    <TextInput
                        placeholder='Enter customer name'
                        style={styles.input}
                        value={customerName}
                        onChangeText={setCustomerName}
                        placeholderTextColor="#666"
                    />
                    
                    <Text style={styles.label}>Category</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={categoryId}
                            style={styles.picker}
                            onValueChange={(itemValue) => setCategoryId(itemValue)}
                            mode="dropdown"
                        >
                            <Picker.Item label="Select Category" value="" />
                            {categories.map((category) => (
                                <Picker.Item key={category.id} label={category.name} value={String(category.id)} />
                            ))}
                        </Picker>
                    </View>
                    
                    <Text style={styles.label}>Product</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={product.id}
                            style={styles.picker}
                            onValueChange={(itemValue) => handleProductChange(itemValue)}
                            mode="dropdown"
                        >
                            <Picker.Item label="Select product" value="0" />
                            {products.map((p) => (
                                <Picker.Item key={p.id} label={p.name} value={String(p.id)} />
                            ))}
                        </Picker>
                    </View>
                    
                    <Text style={styles.label}>Price</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter price"
                        value={String(price)}
                        onChangeText={(text) => setPrice(Number(text))}
                        keyboardType="numeric"
                        placeholderTextColor="#666"
                    />
                    
                    <Text style={styles.label}>Quantity</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter quantity"
                        value={String(quantity)}
                        onChangeText={(text) => setQuantity(Number(text))}
                        keyboardType="numeric"
                        placeholderTextColor="#666"
                    />
                    
                    <TouchableOpacity style={styles.primaryButton} onPress={handleAddOrderItems}>
                        <Text style={styles.buttonText}>Add Order Item</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isPaid}
                            onValueChange={setIsPaid}
                            style={styles.checkbox}
                        />
                        <Text style={styles.checkboxLabel}>Is Paid</Text>
                    </View>
                </View>

                <View style={styles.orderSection}>
                    <Text style={styles.sectionTitle}>Order Items</Text>
                    <FlatList
                        data={orderItems}
                        keyExtractor={(item) => item.productId.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.orderItem}>
                                <Text style={styles.orderItemText}>Product: {item.productName}</Text>
                                <Text style={styles.orderItemText}>Quantity: {item.quantity}</Text>
                                <Text style={styles.orderItemText}>Price: ${item.price.toFixed(2)}</Text>
                                <TouchableOpacity style={styles.primaryButton} onPress={() => handleDeleteOrderItems(index)}>
                                    <Text style={styles.buttonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        style={styles.orderList}
                    />
                    
                    <Text style={styles.totalPrice}>Total Price: ${totalPrice.toFixed(2)}</Text>
                    
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity style={styles.secondaryButton} onPress={ClearOrder}>
                            <Text style={styles.secondaryButtonText}>Clear Order</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.primaryButton} onPress={PlaceOrder}>
                            <Text style={styles.buttonText}>Place Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 24,
    textAlign: 'center',
    width: '100%',
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    width: '100%',
    maxWidth: 480,
  },
  orderSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    width: '100%',
    maxWidth: 480,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#1976d2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 8,
    elevation: 2,
    flex: 1,
    minHeight: 54,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#1976d2',
    elevation: 2,
    flex: 1,
    minHeight: 54,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#1976d2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  orderItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  orderItemText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  orderList: {
    maxHeight: 200,
    marginBottom: 16,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
    marginVertical: 16,
    textAlign: 'right',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 16,
  },
});