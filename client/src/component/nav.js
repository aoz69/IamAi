import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import qr from "../component/qr"
import index from "../component/index"

const logo = require('../images/logo.jpg');

export default function LeftSideNavBar() {
  const navigation = useNavigation();

  const navLinks = [
    { label: 'Home', screen: 'index' },
    { label: 'About', screen: 'qr' },
    { label: 'Product', screen: 'Product' },
    { label: 'Category', screen: 'Category' },
    { label: 'Profile', screen: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      {navLinks.map((link, index) => (
        <TouchableOpacity
          key={index}
          style={styles.linkContainer}
          onPress={() => navigation.navigate(link.screen)}
        >
          <Image source={logo} style={styles.linkLogo} />
          <Text style={styles.linkText}>{link.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDE6ED',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  linkLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  linkText: {
    fontSize: 16,
    color: '#333',
  },
});
