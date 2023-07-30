import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import index from './src/component/home'
import qr from './src/component/qr'
// import home from './src/component/home'
// import test from './src/component/fetchTest';
import nav from './src/component/nav';
import dashtest from './src/component/dashtest';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="nav">
        <Stack.Screen name="Home" component={dashtest}/>
        <Stack.Screen name="qr" component={qr}/>
        <Stack.Screen name="index" component={index}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
