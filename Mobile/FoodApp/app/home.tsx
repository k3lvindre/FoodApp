import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home Screen</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddProduct')}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddOrder')}>
        <Text style={styles.buttonText}>Add Order</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Orders')}>
        <Text style={styles.buttonText}>Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddFund')}>
        <Text style={styles.buttonText}>Add Fund</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Summary')}>
        <Text style={styles.buttonText}>Reports</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  button: {
    width: 350,
    height: 80,
    backgroundColor: '#1976d2',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    elevation: 4, // Android shadow
  },
  buttonText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});