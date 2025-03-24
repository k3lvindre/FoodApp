import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function AddOrder() 
{

    const [price, setPrice] = useState(0);

    const handleAddOrder = async () => {

    }

    return (
        <View>
            <Text>Add Order</Text>
            <Text>Price:</Text>
            <TextInput
                    value={String(price)}
                    onChangeText={(text) => setPrice(Number(text))}
                    keyboardType="numeric"
                  />
            <Button title='Place Order' onPress={() => alert(1)} />
        </View>
    );
}