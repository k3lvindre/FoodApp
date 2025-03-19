import * as React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddProduct from './app/components/product/addproduct';
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
        AddProduct: AddProduct
    },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}