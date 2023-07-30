import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import Nav from '../component/nav';
import Index from '../component/pie';


export default function Dash() {
  const windowWidth = useWindowDimensions().width;
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/fetchProductNumb')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        setProductData(data.productData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Calculate the number of columns based on the window width
  const numColumns = windowWidth >= 768 ? 2 : 1;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Nav />
        {Array.from({ length: numColumns }, (_, index) => (
          <View key={index} style={styles.column}>
            {windowWidth >= 768 ? ( // Render different content for larger screens
            <Index />

            ) : ( // Render different content for smaller screens
            <Index />
            )}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap', // Wrap items to the next row if there is not enough space
    justifyContent: 'center',
    padding: 10,
  },
  column: {
    flex: 1,
    minWidth: '40%', // Minimum width for each column to ensure responsiveness
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 5,
    padding: 10,
  },
  safeArea: {
    flex: 1,
  },
});
