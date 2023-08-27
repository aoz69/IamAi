import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import useFetchData from './fetchTest';
import vars from '../public/vars';
import Addbtn from '../component/addBtn';
import imgg from '../public/images/1.jpg';

const PieComponent = () => {
  const ip = vars();
  const products = useFetchData(ip + 'fetchProducts');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product === selectedProduct ? null : product);
  };


  const handleEdit = () => {
    // Implement edit logic using selectedProduct
  };

  const handleDelete = () => {
    // Implement delete logic using selectedProduct
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {products.products &&
          products.products.map((product) => (
            <TouchableOpacity key={product._id} onPress={() => handleProductClick(product)}>
              <View style={styles.row}>
                <View style={styles.firstColumn}>
                  <Image source={imgg} style={styles.productImage} />
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
              {selectedProduct === product && (
                <View style={styles.editDeleteContainer}>
                  <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))}
      <Addbtn screen='AddProduct'/>
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
  editDeleteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#27374d',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#27374d',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PieComponent;
