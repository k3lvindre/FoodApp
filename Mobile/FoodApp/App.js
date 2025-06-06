import * as React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddProduct from './app/components/products/addproduct';
import AddOrder from './app/components/orders/addorder';
import Orders from './app/components/orders/orders';
import AddFund from './app/components/funds/addFund';
import Summary from './app/components/funds/summary';
import HomeScreen from './app/home';

const RootStack = createNativeStackNavigator(
{
    initialRouteName: 'Home',
    screenOptions: {
        headerStyle: { backgroundColor: 'tomato' },
    },
    screens: 
    {
        Home: HomeScreen,
        AddProduct: AddProduct,
        AddOrder: AddOrder,
        Orders: Orders,
        AddFund: AddFund,
        Summary: Summary,
    },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}