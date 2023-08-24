import { StyleSheet, View, Text, FlatList } from 'react-native';
import PieChart from 'react-native-pie-chart';
import React, { Component } from 'react';
import useFetchData  from './fetchTest'
import vars from '../public/vars';
import ProductTable from './productsTable'

const PieComponent = () => {
  const ip = vars();

  const products = useFetchData(ip +'fetchProducts');
//   const soldStock = useFetchData(ip +'soldCount');
    console.log(products)
    return (
      <View>
        {products.products && products.products.map((product) => (
          <View key={product._id}>
            <Text>{product.name}</Text>
            <Text>{product.price}</Text>
            <Text>{product.stock_Count}</Text>
            <Text>{product.status}</Text>

          </View>
        ))}
      </View>
    );
    
};

export default PieComponent;