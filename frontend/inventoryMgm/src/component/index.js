import React from 'react';
import { View, Text, Button } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Welcome to Home Screen!</Text>
    <Button
    title="Go to Home"
    onPress={() => navigation.navigate('Home')}
    />
    <Button
        title="Go to About"
        onPress={() => navigation.navigate('About')}
      />
          <Button
        title="Go to Dashboard"
        onPress={() => navigation.navigate('pi')}
      />
          <Button
        title="Go to admin"
        onPress={() => navigation.navigate('test')}
      />
          <Button
        title="Go to nav"
        onPress={() => navigation.navigate('nav')}
      />
    </View>
  );
}

export default HomeScreen;
