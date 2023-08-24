import { StyleSheet, View, Text, FlatList } from 'react-native';
import PieChart from 'react-native-pie-chart';
import React, { Component } from 'react';
import useFetchData  from './fetchTest'
import vars from '../public/vars';

const PieComponent = () => {
  const ip = vars();

  const products = useFetchData(ip +'fetchProducts');
//   const soldStock = useFetchData(ip +'soldCount');
    console.log(products)

    const renderProduct = ({ products }) => (
        <View style={styles.productRow}>
          <Text style={styles.productName}>{products.name}</Text>
          <Text style={styles.productPrice}>{products.price}</Text>
          <Text style={styles.productStock}>{products.stock_Count}</Text>
          <Text style={styles.productStatus}>{products.status}</Text>
        </View>
      );
    
      return (
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Name</Text>
            <Text style={styles.headerText}>Price</Text>
            <Text style={styles.headerText}>Stock Count</Text>
            <Text style={styles.headerText}>Status</Text>
          </View>
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(products) => products._id}
          />
        </View>
      );
};

export default PieComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Layout children in a row
    margin: '10%',
    marginRight: 0, // Remove right margin to keep the grids side by side
  },
  pieContainer: {
    flex: 1, // Occupy 1/2 of the available space for the pie chart
  },
  colorDetailsContainer: {
    flex: 1, // Occupy 1/2 of the available space for the color details
    marginLeft: 10, // Add some spacing between the pie chart and color details
    marginTop: 30,
  },
  colorDetailItem: {
    flexDirection: 'row', // Layout children in a row
    marginLeft: 30, // Add spacing between color square and color name
    marginBottom: 10,
  },
  colorSquare: {
    width: 20,
    height: 20,
    marginRight: 10, // Add spacing between color square and color name
  },
  colorText: {
    fontSize: 15,
    color: '#27374D',
  },
  valueText: {
    fontSize: 15,
    color: '#27374D',
    marginLeft: 'auto', // Push the value text to the right
  },
});
