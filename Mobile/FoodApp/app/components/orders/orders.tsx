import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../constants/api';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
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
        const response = await fetch(`${BASE_URL}/ProductCategories`);
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

      const response = await fetch(`${BASE_URL}/orders?${queryParams}`);
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
      <View style={styles.orderHeader}>
        <Text style={styles.orderTitle}>Order #{item.id}</Text>
        <View style={[styles.badge, item.isPaid ? styles.paidBadge : styles.unpaidBadge]}>
          <Text style={styles.badgeText}>{item.isPaid ? 'Paid' : 'Unpaid'}</Text>
        </View>
      </View>
      <Text style={styles.orderText}>Customer: {item.customerName}</Text>
      <Text style={styles.orderText}>Date: {new Date(item.dateCreated).toLocaleDateString()}</Text>
      <View style={styles.itemsList}>
        {item.orderItems.map((orderItem) => (
          <View key={orderItem.id} style={styles.orderItemRow}>
            <Text style={styles.orderText}>{orderItem.productId}</Text>
            <Text style={styles.orderText}>Qty: {orderItem.quantity}</Text>
            <Text style={styles.orderText}>${orderItem.price.value.toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const handleSearch = () => {
    setPageNumber(1);
    setHasMore(true);
    fetchOrders(true); // Reset the list and fetch new data
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Orders</Text>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Filters</Text>
          
          <Text style={styles.label}>Date Range</Text>
          <View style={styles.dateContainer}>
            <TextInput
              style={[styles.input, styles.dateInput]}
              placeholder="From Date (YYYY-MM-DD)"
              value={fromDate}
              onChangeText={setFromDate}
              placeholderTextColor="#666"
            />
            <TextInput
              style={[styles.input, styles.dateInput]}
              placeholder="To Date (YYYY-MM-DD)"
              value={toDate}
              onChangeText={setToDate}
              placeholderTextColor="#666"
            />
          </View>

          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerContainer}>
            <Picker
              mode="dropdown"
              selectedValue={categoryId}
              style={styles.picker}
              onValueChange={(itemValue) => setCategoryId(itemValue)}
            >
              <Picker.Item label="All Categories" value="" />
              {categories.map((category) => (
                <Picker.Item key={category.id} label={category.name} value={String(category.id)} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Payment Status</Text>
          <View style={styles.pickerContainer}>
            <Picker
              mode="dropdown"
              selectedValue={isPaid}
              style={styles.picker}
              onValueChange={(itemValue) => setIsPaid(itemValue)}
            >
              <Picker.Item label="All" value="" />
              <Picker.Item label="Paid" value="true" />
              <Picker.Item label="Unpaid" value="false" />
            </Picker>
          </View>

          <Text style={styles.label}>Customer Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter customer name"
            value={customerName}
            onChangeText={setCustomerName}
            placeholderTextColor="#666"
          />

          <TouchableOpacity style={styles.primaryButton} onPress={handleSearch}>
            <Text style={styles.buttonText}>Search Orders</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orderSection}>
          <Text style={styles.sectionTitle}>Order List</Text>
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderOrderItem}
            style={styles.orderList}
          />

          {hasMore && !isLoading && (
            <TouchableOpacity style={styles.secondaryButton} onPress={() => fetchOrders()}>
              <Text style={styles.secondaryButtonText}>Load More</Text>
            </TouchableOpacity>
          )}

          {isLoading && <ActivityIndicator size="large" color="#1976d2" style={styles.loader} />}

          <Text style={styles.totalPrice}>Total Amount: ${totalAmount.toFixed(2)}</Text>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
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
  dateInput: {
    flex: 1,
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
  orderItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  paidBadge: {
    backgroundColor: '#4caf50',
  },
  unpaidBadge: {
    backgroundColor: '#f44336',
  },
  badgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  orderText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  itemsList: {
    marginTop: 8,
  },
  orderItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  primaryButton: {
    backgroundColor: '#1976d2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 8,
    elevation: 2,
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
  orderList: {
    marginBottom: 16,
  },
  loader: {
    marginVertical: 16,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
    textAlign: 'right',
    marginTop: 16,
  },
});