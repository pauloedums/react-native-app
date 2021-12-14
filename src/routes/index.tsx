import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Box, useColorMode, Container, ScrollView } from 'native-base';
import React from 'react';
import { Appbar } from 'react-native-paper';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import SignUpPage from '../pages/SignUp';


export type TypeRoutes = {
    SignUp: undefined;
    Login: undefined;
    Home: undefined;
}

const Stack = createNativeStackNavigator<TypeRoutes>();

function CustomNavigationBar({ navigation, back}) {
    const { toggleColorMode } = useColorMode();
    return (
      <Appbar.Header>
        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null }
        <Appbar.Content title="#MyPhonesList" />
        <Appbar.Action icon="invert-colors" onPress={toggleColorMode} />
      </Appbar.Header>
    );
}

export default function Routes() {
    return (
        <NavigationContainer >
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                header: (props) => <CustomNavigationBar {...props} />,
                }}
            >
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="SignUp" component={SignUpPage} />
                <Stack.Screen name="Home" component={HomePage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}