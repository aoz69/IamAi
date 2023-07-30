import { StyleSheet, Text,View,ScrollView, Button } from 'react-native'
import { useState, useEffect } from "react";
import React from 'react'
import Nav from '../component/nav'
import Pie from '../component/pie'
import {useNavigation} from '@react-navigation/core'



export default function dash(){
  const [productData, setproductNum] = useState([]); // Initialize with an empty array

  useEffect(() => {
    fetch('http://localhost:3000/fetchProductNumb')
      .then(res => {
        if (res.ok) {
          return res.json(); // Parse the JSON response
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        setproductNum(data.productData); // Set the product data in the state
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty dependency array makes sure this effect runs only once on mount

  // const statuses = productData.map(product => product.status);
  // console.log(statuses);

  const navigation = useNavigation();
    return(
    <>
      <View>
        <Nav />
      </View>

      <View style = {styles.displayGrid}>
        <div style={styles.gridBox}>
          <View>
            <Button
            title="Go to Home"
            onPress={() => navigation.navigate('Home')}
            />
            <Button
                title="Go to About"
                onPress={() => navigation.navigate('About')}
              />
                  <Button
                title="Go to Dashboard"
                onPress={() => navigation.navigate('pi')}
              />
                  <Button
                title="Go to admin"
                onPress={() => navigation.navigate('test')}
              />
                  <Button
                title="Go to nav"
                onPress={() => navigation.navigate('nav')}
              />
          </View>
          </div>
          <div style={styles.gridBox}>
            <h1 style = {styles.heading}>Dashboard</h1>
            <Pie />
          </div>
          <div style={styles.gridBox}>
            <h1 style = {styles.heading}>Overview</h1>  
              <div style={styles.black}>
                  <h2>25</h2>
                  <h4>Sales</h4>
              </div>
              <div style={styles.black}>
                  <h2>25</h2>
                  <h4>Sales</h4>
              </div>
              <div style={styles.black}>
                  <h2>{productData}</h2>
                  <h4>Products</h4>
              </div>
          </div>
      </View>   
    </>
  );
}


const styles = StyleSheet.create({
  body:{
    margin:0,
    padding: 0,
  },
  displayGrid:{
    margin: 0,
    padding: 0,
    display: "grid",
    gridTemplateColumns: '25% 45% 25%',
    // gridGap: '5%',
    justifyContent: "center",
  },
  heading:{
    textAlign: 'center'
  },
  gridBox:{
    textAlign: 'center',
    justifyContent: "center",
    alignItems: 'center',
    border: '1px solid rgba(0, 0, 0, 0.8)'
  },
  black: {
    backgroundColor: 'black',
    color: 'white',
    height: 'fit-content',
    width: 'fit-content',
    marginLeft : '45%',
    padding: '5%'
  }
});