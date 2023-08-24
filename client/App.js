import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import login from './src/component/index'
import qr from './src/component/qr'
import nav from './src/component/nav';
import dashtest from './src/component/dashtest';
import product from './src/component/product';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="nav">
        <Stack.Screen name="Home" component={dashtest}/>
        <Stack.Screen name="qr" component={product}/>
        <Stack.Screen name="index" component={dashtest}/>
        <Stack.Screen name="Profile" component={login}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
