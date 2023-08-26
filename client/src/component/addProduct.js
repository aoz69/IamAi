import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import useFetchData from './fetchTest';
import DatePicker from 'react-datepicker';
import {Picker} from '@react-native-picker/picker';

import vars from "../public/vars";

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stockCount, setStockCount] = useState('');
  const [barcodeId, setBarcodeId] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [errorMsg, setErrorMsg] = useState('');


  const ip = vars();
  const cate = useFetchData(ip + 'fetchCate');
  console.log(cate)
  const addProduct = async () => {
      
      console.log("name:", name);
      console.log("price:", price);
      console.log("stockCount:", stockCount);
      console.log("barcodeId:", barcodeId);
      console.log("status:", status);
      console.log("category:", category);
      console.log("date:", date);
  
      try {
        
        const formattedDate = date.toISOString();
          const response = await fetch(ip + 'addProduct', {
              method: 'POST',
              headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price, stockCount, barcodeId, status, category, date:formattedDate }),
      });


      if (response.ok) {
        const responseBody = await response.json();
        if (responseBody.status === 'success') {
          console.log('Product Added Successfully');
          setErrorMsg('');
        } else {
          setErrorMsg(responseBody.error);
          console.log('Failed Product Added ' + responseBody.error);
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
        { label: 'Low stock', value: 'lowstock' },
        { label: 'Archived', value: 'archived' },
        { label: 'Sold', value: 'sold' },

      ];

      const renderCategories = () => {
        if (cate && cate.category && Array.isArray(cate.category)) {
          return cate.category.map(cat => (
            <Picker.Item key={cat._id} label={cat.name} value={cat._id} />
          ));
        } else {
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
              <Picker.Item key={""} label={"Select category"} value={""} />

          </Picker>
    
          <Text style={styles.label}>SET CATEGORY:</Text>
      <Picker
        selectedValue={category}
        onValueChange={itemValue => setCategory(itemValue)}
        style={styles.picker}
      >
        {renderCategories()}
        <Picker.Item key={""} label={"Select category"} value={""} />

      </Picker>

          <Button title="Add Product" onPress={addProduct} />
    
          {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
        </View>
        </ScrollView>

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
      },
      errorText: {
        color: 'red',
        marginTop: 8,
      },
    });
    
    export default AddProduct;