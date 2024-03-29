import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import login from './src/component/index'
import qr from './src/component/qr'
import addProduct from './src/component/addProduct';
import dashtest from './src/component/dashtest';
import product from './src/component/product';
import category from './src/component/category';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="nav">
        <Stack.Screen name="Home" component={dashtest}/>
        <Stack.Screen name="Product" component={product}/>
        <Stack.Screen name="AddProduct" component={addProduct}/>
        <Stack.Screen name="Category" component={category}/>
        <Stack.Screen name="QR" component={qr}/>
        <Stack.Screen name="Profile" component={login}/>
        <Stack.Screen name="Logout" component={login}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
