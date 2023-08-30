import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const logo = require('../public/images/logo.jpg');
const home = require('../public/images/home.png');
const prod = require('../public/images/prod.png');
const cat = require('../public/images/cat.png');
const pro = require('../public/images/pro.png');
const qrr = require('../public/images/qr.png');
const logout = require('../public/images/logOut.png');

export default function LeftSideNavBar() {
  const navigation = useNavigation();
  const windowWidth = useWindowDimensions().width;

  const navLinks = [
    { label: 'Home', screen: 'index', img: home },
    { label: 'Product', screen: 'Product', img: prod },
    { label: 'Category', screen: 'Category', img: cat },
    { label: 'QR', screen: 'QR', img: qrr },
    { label: 'Profile', screen: 'Profile', img: pro },
    { label: 'Logout', screen: 'Logout', img: logout },
  ];

  return (
    <>
      {windowWidth >= 768 ? (
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
          {navLinks.map((link, index) => (
            <TouchableOpacity
              key={index}
              style={styles.linkContainer}
              onPress={() => navigation.navigate(link.screen)}
            >
              <Image source={link.img} style={styles.linkLogo} />
              <Text style={styles.linkText}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.phoneContainer}>
          {navLinks.map((link, index) => (
            <TouchableOpacity
              key={index}
              style={styles.phoneLinkContainer}
              onPress={() => navigation.navigate(link.screen)}
            >
              <Image source={link.img} style={styles.phoneLinkLogo} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDE6ED',
    paddingTop: 20,
    paddingHorizontal: 20,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    height: 50,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  linkLogo: {
    width: 30,
    height: 30,
    marginRight: 15,
    resizeMode: 'contain',
  },
  linkText: {
    fontSize: 18,
    color: '#333',
  },
  phoneContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#DDE6ED',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    zIndex: 10000,
  },
  phoneLinkContainer: {
    alignItems: 'center',
  },
  phoneLinkLogo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
