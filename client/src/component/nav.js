import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import qr from "../component/qr"
import index from "../component/index"

const logo = require('../images/logo.jpg');
const home = require('../images/home.png');
const prod = require('../images/prod.png');
const cat = require('../images/cat.png');
const pro = require('../images/pro.png');
const qrr = require('../images/qr.png');
const logout = require('../images/logOut.png');


export default function LeftSideNavBar() {
  const navigation = useNavigation();
  const windowWidth = useWindowDimensions().width;

  const navLinks = [
    { label: 'Home', screen: 'index', img: home },
    { label: 'Product', screen: 'qr', img: prod },
    { label: 'Category', screen: 'Category', img: cat },
    { label: 'QR', screen: 'Profile', img: qrr },
    { label: 'Profile', screen: 'Login', img: pro },
    { label: 'Logout', screen: 'Profile', img: logout },

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
    paddingHorizontal: 1,
  },
  logo: {
    height: 50,
    resizeMode: 'contain',
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    boxShadow: '0 2px',
  },
  linkLogo: {
    width: 80,
    height: 50,
    marginRight: 10,
    marginTop: 20,
    resizeMode: 'contain',
  },
  linkText: {
    fontSize: 30,
    color: '#333',
  },
  // Styles for the navigation bar on phones
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
    height: 60,
    resizeMode: 'contain',
  },
});
