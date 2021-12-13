import { extendTheme, NativeBaseProvider, ScrollView } from 'native-base';
import React from 'react';
import Routes from './src/routes';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

// extend the theme
const customTheme = extendTheme({ config });

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      
        <Routes />
    </NativeBaseProvider>
  );
}
