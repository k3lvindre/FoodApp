import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalAmount, setTotalAmount] = useState(0);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isPaid, setIsPaid] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // To track if more data is available

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

  const fetchOrders = async (reset = false) => {
    if (isLoading || (!reset && !hasMore)) return;

    setIsLoading(true);

    try {
      const queryParams = new URLSearchParams({
        pageNumber: reset ? '1' : pageNumber.toString(),
        pageSize: pageSize.toString(),
        fromDate,
        toDate,
        categoryId: categoryId.toString(),
        isPaid: isPaid.toString(),
        customerName,
      });

      const response = await fetch(`http://192.168.254.100:5114/api/orders?${queryParams}`);
      const data = await response.json();
      
      if (reset) {
        setOrders(data.orders);
      } else {
        setOrders((prevOrders) => [...prevOrders, ...data.orders]);
      }

      setTotalAmount((currentAmount) => currentAmount + data.totalAmount);
      setHasMore((prevValue) => orders.length + 1 != data.totalCount); // If fewer items are returned, no more data
      setPageNumber((prevPage) => (reset ? 2 : prevPage + 1));
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch orders');
    } finally {
      setIsLoading(false);
    }
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text>Order Id: {item.id}</Text>
      <Text>Customer: {item.customerName}</Text>
      <Text>Date: {item.dateCreated}</Text>
      <Text>Paid: {item.isPaid ? 'Yes' : 'No'}</Text>
      <Text>Items:</Text>
      {item.orderItems.map((orderItem) => (
        <Text key={orderItem.id}>
          - Product ID: {orderItem.productId}, Quantity: {orderItem.quantity}, Price: {orderItem.price.value}
        </Text>
      ))}
    </View>
  );

  const handleSearch = () => {
    setPageNumber(1);
    setHasMore(true);
    fetchOrders(true); // Reset the list and fetch new data
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filters</Text>
      <TextInput
        style={styles.input}
        placeholder="From Date (YYYY-MM-DD)"
        value={fromDate}
        onChangeText={setFromDate}
      />
      <TextInput
        style={styles.input}
        placeholder="To Date (YYYY-MM-DD)"
        value={toDate}
        onChangeText={setToDate}
      />
      <Picker
        mode="dialog"
        selectedValue={categoryId}
        style={styles.input}
        onValueChange={(itemValue) => setCategoryId(itemValue)}
      >
        <Picker.Item label="All Categories" value="" />
        {categories.map((category) => (
          <Picker.Item key={category.id} label={category.name} value={String(category.id)} />
        ))}
      </Picker>
      <Picker
        mode="dialog"
        selectedValue={isPaid}
        style={styles.input}
        onValueChange={(itemValue) => setIsPaid(itemValue)}
      >
        <Picker.Item label="All" value="" />
        <Picker.Item label="Paid" value="true" />
        <Picker.Item label="Unpaid" value="false" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Customer Name"
        value={customerName}
        onChangeText={setCustomerName}
      />
      <Button title="Search" onPress={handleSearch} />
      <Text style={styles.label}>Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrderItem}
      />

      {hasMore && !isLoading && (
        <Button title="Load More" onPress={() => fetchOrders()} />
      )}

      {isLoading && <ActivityIndicator size="large" color="blue" />}

      <Text style={styles.totalAmount}>Total Amount: {totalAmount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  orderItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  totalAmount: {
    fontWeight: 'bold',
    marginTop: 16,
  },
});