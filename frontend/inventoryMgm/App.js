
import { SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import index from './src/component/index'
import qr from './src/component/qr'
import home from './src/component/home'
import test from './src/component/fetchTest';
import nav from './src/component/nav';
import dashtest from './src/component/dashtest';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="dashtest">
        <Stack.Screen name="dashtest" component={dashtest}/>
        <Stack.Screen name="Home" component={index}/>
        <Stack.Screen name="About" component={qr} />
        <Stack.Screen name="pi" component={home} />
        <Stack.Screen name="test" component={test} />
        <Stack.Screen name="nav" component={nav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
