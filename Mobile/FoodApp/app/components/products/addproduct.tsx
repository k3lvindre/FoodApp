import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BASE_URL } from '../../constants/api';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/productcategories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch categories');
      }
    };

    fetchCategories();
  }, []);


  const handleAddProduct = async () => {
    if (!name || !categoryId || !price || !stock) {
        Alert.alert('Error', 'All fields are required');
        return;
    }

    const product = {
      name,
      categoryId,
      price,
      stock,
    };

    try {
      const response = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        Alert.alert('Success', 'Product added successfully');
      } else {
        Alert.alert('Error', 'Failed to add product');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred');
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Add Product</Text>
        
        <View style={styles.formSection}>
          <Text style={styles.label}>Product Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter product name"
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
              {categories.map((category) => (
                <Picker.Item key={category.id} label={category.name} value={category.id} />
              ))}
            </Picker>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                value={String(price)}
                onChangeText={(text) => setPrice(Number(text))}
                keyboardType="numeric"
                placeholder="Enter price"
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Stock</Text>
              <TextInput
                style={styles.input}
                value={String(stock)}
                onChangeText={(text) => setStock(Number(text))}
                keyboardType="numeric"
                placeholder="Enter stock"
                placeholderTextColor="#666"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleAddProduct}>
            <Text style={styles.buttonText}>Add Product</Text>
          </TouchableOpacity>
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
    alignItems: 'center', // Center the form on larger screens
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
    maxWidth: 480, // Limit width on larger screens
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
    padding: 14,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    minHeight: 48, // Ensure consistent height with picker
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    minHeight: 48,
  },
  picker: {
    height: 48,
    width: '100%',
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -8, // Compensate for column padding
  },
  column: {
    flex: 1,
    paddingHorizontal: 8, // Better than gap for compatibility
  },
  primaryButton: {
    backgroundColor: '#1976d2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    elevation: 2,
    minHeight: 54, // Larger touch target
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});