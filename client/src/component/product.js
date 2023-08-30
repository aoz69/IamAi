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

  const handleBrowse = () => {
    // Implement Browse logic using selectedProduct
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
              <View
                style={[
                  styles.productContainer,
                  selectedProduct === product && styles.selectedProductContainer,
                ]}
              >
                <View style={styles.productImageContainer}>
                  <Image source={imgg} style={styles.productImage} />
                </View>
                <View style={styles.productDetailsContainer}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>Price: {product.price}</Text>
                  <Text style={styles.productStatus}>Status: {product.status}</Text>
                  <Text style={styles.productStock}>Stock Left: {product.stock_Count}</Text>
                  <Text style={styles.productCategory}>Category: {product.category}</Text>
                  <Text style={styles.productExpiry}>Expiry Date: {product.date}</Text>
                </View>
              </View>
              {selectedProduct === product && (
                <View style={styles.actionsContainer}>
                  <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.editButton} onPress={handleBrowse}>
                    <Text style={styles.buttonText}>Browse Category</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))}
        <Addbtn screen='AddProduct' />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '90%',
    paddingTop: 16,
    alignSelf: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
  },
  selectedProductContainer: {
    backgroundColor: '#dde6ed', // Darker background for selected product
  },
  productImageContainer: {
    marginRight: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productDetailsContainer: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  productPrice: {
    color: '#666',
    marginBottom: 2,
  },
  productStatus: {
    color: '#666',
    marginBottom: 2,
  },
  productStock: {
    color: '#666',
    marginBottom: 2,
  },
  productCategory: {
    color: '#666',
    marginBottom: 2,
  },
  productExpiry: {
    color: '#666',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  editButton: {
    backgroundColor: '#27374d',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#d9534f',
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