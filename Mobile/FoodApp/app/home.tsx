import * as React from 'react';
import { View, Text} from 'react-native';
import { Button } from '@react-navigation/elements';
import {
  useNavigation,
} from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('AddProduct')}>
        Add Product
      </Button>
      <Button onPress={() => navigation.navigate('AddOrder')}>
        Add Order
      </Button>
      <Button onPress={() => navigation.navigate('Orders')}>
        Orders
      </Button>
      <Button onPress={() => navigation.navigate('AddFund')}>
        Add Fund
      </Button>
      <Button onPress={() => navigation.navigate('Summary')}>
        Reports
      </Button>
    </View>
  )
}