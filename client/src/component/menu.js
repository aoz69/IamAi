import { StyleSheet,View, Button } from 'react-native'
import React from 'react'

const menu = () => {
  return (
  <div>
    <Button
    title="Profile"
    onPress={() => navigation.navigate('Profile')}
    color="#ef9b20"
    />
  <Button
    title="Products"
    onPress={() => navigation.navigate('Products')}
    color="#edbf33"
    />
  <Button
    title="Analysis Tools"
    onPress={() => navigation.navigate('Analysis')}
    color="#bdcf32"
    />
  <Button
    title="Categories"
    onPress={() => navigation.navigate('Categories')}
    color="#ede15b"
    />
  </div>
)}  
       
export default menu