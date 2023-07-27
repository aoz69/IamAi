import { StyleSheet, Button, View } from 'react-native'
import React from 'react'

function menu({ navigation }) {
  return (
  
  <View>
    <Button style={styles.container}
    title="da"
    onPress={() => navigation.navigate('About')}
    color="#ef9b20"
    />
  <Button style={styles.container}
    title="Products"
    onPress={() => navigation.navigate('About')}
    color="#edbf33"
    />
  <Button style={styles.container}
    title="Analysis Tools"
    onPress={() => navigation.navigate('Analysis')}
    color="#bdcf32"
    />
  <Button style={styles.container}
    title="Categories"
    onPress={() => navigation.navigate('Categories')}
    color="#ede15b"
    />
  </View>
)};  

const styles = StyleSheet.create({
  container: {
    margin: '20px',
  },
});
export default menu;