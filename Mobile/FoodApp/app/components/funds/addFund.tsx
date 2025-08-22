import { useState, useEffect } from 'react';
import { BASE_URL } from '../../constants/api';
import { View, Text, TouchableOpacity, Alert, TextInput, StyleSheet, ScrollView } from 'react-native';
import { ProductCategory } from '../products/models/common/productCategoryEnum';
import { Picker } from '@react-native-picker/picker';

export default function AddFund() {

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(0);
    const [amount, setAmount] = useState(0.00);

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

    const handleAddFund = async () => {
        try {
          const response = await fetch(`${BASE_URL}/funds`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productCategoryId: categoryId,
              amount: amount,
              description: "Add Fund",
            })
          });

          if (response.ok) { 
            const data = await response.json();
            Alert.alert("Success", "Fund added successfully. id:" + data);
          }
        }
        catch (error) {
          Alert.alert("Error", "Failed to add fund");
        }
    }

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.headerText}>Add Fund</Text>
                
                <View style={styles.formSection}>
                    <Text style={styles.label}>Fund Type</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={categoryId}
                            style={styles.picker}
                            onValueChange={(itemValue) => setCategoryId(itemValue)}
                            mode="dropdown"
                        >
                            <Picker.Item label="Select Category" value="0" />
                            {categories.map((category) => (
                                <Picker.Item key={category.id} label={category.name} value={String(category.id)} />
                            ))}
                        </Picker>
                    </View>

                    <Text style={styles.label}>Amount</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Enter Amount'
                        value={String(amount)}
                        onChangeText={(value) => setAmount(Number(value))}
                        keyboardType="numeric"
                        placeholderTextColor="#666"
                    />

                    <TouchableOpacity style={styles.primaryButton} onPress={handleAddFund}>
                        <Text style={styles.buttonText}>Add Fund</Text>
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
        minHeight: 48,
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
    primaryButton: {
        backgroundColor: '#1976d2',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginVertical: 8,
        elevation: 2,
        minHeight: 54,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});