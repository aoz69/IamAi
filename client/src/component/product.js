import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useFetchData from './fetchTest';
import vars from '../public/vars';
import Addbtn from '../component/addBtn'


const PieComponent = () => {
  const ip = vars();
  const products = useFetchData(ip + 'fetchProducts');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Product Name</Text>
        <Text style={styles.headerText}>Price</Text>
        <Text style={styles.headerText}>Stock Count</Text>
        <Text style={styles.headerText}>Status</Text>
      </View>

      {products.products &&
        products.products.map((product) => (
          <View style={styles.row} key={product._id}>
            <Text style={styles.column}>{product.name}</Text>
            <Text style={styles.column}>{product.price}</Text>
            <Text style={styles.column}>{product.stock_Count}</Text>
            <Text style={styles.column}>{product.status}</Text>
          </View>
        ))}
        <Addbtn />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
  },
  column: {
    flex: 1,
    fontSize: 14,
  },
});

export default PieComponent;
