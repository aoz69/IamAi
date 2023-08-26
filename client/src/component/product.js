import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView  } from 'react-native';
import useFetchData from './fetchTest';
import vars from '../public/vars';
import Addbtn from '../component/addBtn'
import imgg from '../public/images/1.jpg';

const PieComponent = () => {
  const ip = vars();
  const products = useFetchData(ip + 'fetchProducts');

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      {products.products &&
        products.products.map((product) => (
          <View style={styles.row} key={product._id}>
            <View style={styles.firstColumn}>
            <Image source={imgg} style={styles.productImage}/>
  
            </View>
            <View style={styles.secondColumn}>
              <Text>
                <Text style={styles.productName}>
                  Name: 
                </Text>
                {product.name}
              </Text>
              <Text>
                <Text style={styles.productName}>
                  Price: 
                </Text>
                {product.price}
              </Text>
              <Text>
                <Text style={styles.productName}>
                  Status: 
                </Text>
                {product.status}
              </Text>
              <Text>
                <Text style={styles.productName}>
                  Stock Left: 
                </Text>
                {product.stock_Count}
              </Text>
              <Text>
                <Text style={styles.productName}>
                  Category: 
                </Text>
                {product.category}
              </Text>
              <Text>
                <Text style={styles.productName}>
                 Expiry Date:  
                </Text>
                {product.date}
              </Text>
            </View>

          </View>
        ))}
      <Addbtn />
    </View>
  </ScrollView>

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
  firstColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondColumn: {
    flex: 2,
  },
  thirdColumn: {
    flex: 1,
  },
  fourthColumn: {
    flex: 1,
  },
  productImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  productName: {
    fontWeight: 'bold',
  },
});

export default PieComponent;
