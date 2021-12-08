import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../pages/Home';
import ProductPage from '../pages/ProductPage';
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/SignUp';

export type TypeRoutes = {
    Product: undefined;
    SignUp: undefined;
    Login: undefined;
    Home: undefined;
}

const Stack = createNativeStackNavigator<TypeRoutes>();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="SignUp" component={SignUpPage} />
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="Product" component={ProductPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}