import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

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
      const response = await fetch('http://localhost:5114/api/products', {
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
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Category ID</Text>
      <TextInput
        style={styles.input}
        value={String(categoryId)}
        onChangeText={(text) => setCategoryId(Number(text))}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={String(price)}
        onChangeText={(text) => setPrice(Number(text))}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Stock</Text>
      <TextInput
        style={styles.input}
        value={String(stock)}
        onChangeText={(text) => setStock(Number(text))}
        keyboardType="numeric"
      />
      <Button title="Add Product" onPress={handleAddProduct} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
});