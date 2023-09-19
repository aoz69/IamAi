import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import useFetchData from './fetchTest';
import DatePicker from 'react-datepicker';
import { Picker } from '@react-native-picker/picker';
import vars from '../public/vars';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stockCount, setStockCount] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [errorMsg, setErrorMsg] = useState('');

  const ip = vars();
  const cate = useFetchData(ip + 'fetchCate');
  console.log(cate);

  const addProduct = async () => {
    try {
      const formattedDate = date.toISOString();
      const response = await fetch(ip + 'addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price, stockCount, status, category, date: formattedDate }),
      });

      if (response.ok) {
        const responseBody = await response.json();
        if (responseBody.status === 'success') {
          setErrorMsg('');
        } else {
          setErrorMsg(responseBody.error);
        }
      } else {
        setErrorMsg('Request failed');
      }
    } catch (error) {
      setErrorMsg('Network error');
      console.error('Error:', error);
    }
  };

  const stat = [
    { label: 'In Stock', value: 'instock' },
    { label: 'Low Stock', value: 'lowstock' },
    { label: 'Archived', value: 'archived' },
    { label: 'Sold', value: 'sold' },
  ];

  const renderCategories = () => {
    if (cate && cate.category && Array.isArray(cate.category)) {
      console.log("BRRRRRRRRRRRRRRR")
      return cate.category.map((cat) => (
        <Picker.Item key={cat._id} label={cat.name} value={cat._id} />
      ));
    } 
    else {
      console.log("ERRRRRRR")
      return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Add Product</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          onChangeText={(text) => setPrice(text)}
          value={price}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Stock Number"
          onChangeText={(text) => setStockCount(text)}
          value={stockCount}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Set Status:</Text>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          style={styles.picker}
        >
          {stat.map((cat) => (
            <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
          ))}
        </Picker>

        <Text style={styles.label}>Set Category:</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          {renderCategories()}
        </Picker>

        <Button title="Add Product" onPress={addProduct} />

        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#27374d',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#27374d',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 16,
    color: '#333',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
});

export default AddProduct;
