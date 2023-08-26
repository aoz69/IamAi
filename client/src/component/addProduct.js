import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';

import vars from "../public/vars";

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stockCount, setStockCount] = useState('');
  const [barcodeId, setBarcodeId] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [errorMsg, setErrorMsg] = useState('');


  const ip = vars();

  const addProduct = async () => {

    // console.log("name:", name);
    // console.log("price:", price);
    // console.log("stockCount:", stockCount);
    // console.log("barcodeId:", barcodeId);
    // console.log("status:", status);
    // console.log("category:", category);
    // console.log("date:", date);

      try {
   
      const response = await fetch(ip + 'addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price, stockCount, barcodeId, status, category, date }),
      });

      if (response.ok) {
        const responseBody = await response.json();
        if (responseBody.status === 'success') {
          console.log('Product Added Successfully');
          setErrorMsg('');
        } else {
          setErrorMsg(responseBody.error);
          console.log('Failed Product Added');
        }
      } else {
        setErrorMsg('Request failed');
      }
    } catch (error) {
      setErrorMsg('Network error');
      console.error('Error:', error);
    }
  };

  const categories = [
        { label: 'Select Category', value: '' },
        { label: 'Food', value: '64c9d5edcb64f28afac47fc2' },
        { label: 'Others', value: '64c9d5edcb64f28afac47fc3' },
    ];

    const stat = [
        { label: 'Select Category', value: '' },    
        { label: 'instock', value: 'instock' },
        { label: 'lowstock', value: 'lowstock' },
      ];

      return (
        <View style={styles.container}>
          <Text style={styles.heading}>Add Product</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={text => setName(text)}
            value={name}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            onChangeText={text => setPrice(text)}
            value={price}
            keyboardType="numeric" // Show numeric keyboard
          />
          <TextInput
            style={styles.input}
            placeholder="Stock Number"
            onChangeText={text => setStockCount(text)}
            value={stockCount}
            keyboardType="numeric" // Show numeric keyboard
          />
          <TextInput
            style={styles.input}
            placeholder="BarCode"
            onChangeText={text => setBarcodeId(text)}
            value={barcodeId}
          />
    
          <Text style={styles.label}>SET STATUS:</Text>
          <Picker
            selectedValue={status}
            onValueChange={itemValue => setStatus(itemValue)}
            style={styles.picker}
          >
            {stat.map(cat => (
              <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
            ))}
          </Picker>
    
          <Text style={styles.label}>SET CATEGORY:</Text>
          <Picker
            selectedValue={category}
            onValueChange={itemValue => setCategory(itemValue)}
            style={styles.picker}
          >
            {categories.map(cat => (
              <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
            ))}
          </Picker>
    
          <TextInput
            style={styles.input}
            placeholder="Date"
            onChangeText={text => setDate(text)}
            value={date}
          />
          <Button title="Add Product" onPress={addProduct} />
    
          {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
      },
      heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
      },
      label: {
        fontSize: 18,
        marginBottom: 8,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
      },
      picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 16,
      },
      errorText: {
        color: 'red',
        marginTop: 8,
      },
    });
    
    export default AddProduct;