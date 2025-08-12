import { useState, useEffect } from 'react';
import { BASE_URL } from '../../constants/api';
import { View, Text, Button, Alert, TextInput } from 'react-native';
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Add Fund Screen</Text>
            <Text>Fund Type:</Text>
            <Picker
                selectedValue={categoryId}
                onValueChange={(itemValue) => setCategoryId(itemValue)}>
                <Picker.Item label="Select Category" value="0" />
                {categories.map((category) => (
                    <Picker.Item key={category.id} label={category.name} value={String(category.id)} />
                ))}
            </Picker>
            <Text>Amount:</Text>
            <TextInput placeholder='Enter Amount' value={String(amount)} onChangeText={(value) => setAmount(Number(value))} />
            <Button title='Add Fund' onPress={handleAddFund} />
        </View>
    );
}