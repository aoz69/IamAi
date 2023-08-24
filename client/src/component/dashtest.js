import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Nav from '../component/nav';
import Pie from '../component/pie';
import useFetchData  from './fetchTest'
import vars from '../public/vars'


export default function Dash() {
  const windowWidth = useWindowDimensions().width;
  const ip = vars();
  const p = useFetchData(ip +'fetchProductNumb');
  const c = useFetchData(ip +'fetchCateNumb');
  const r = useFetchData(ip +'rev');
  const sessionData = useFetchData(ip +'getSession');



  return (
      <View style={styles.container}>
        <Nav />
        {windowWidth >= 768 ? (
          <>
            {Array.from({ length: 2 }, (_, index) => (
              <View key={index} style={styles.column}>
                <Pie />
              </View>
            ))}
          </>
        ) : (
          <ScrollView style={{height:'100%'}}>
            <View style={styles.column}>
              <View style={[styles.box, styles.salesBox]}>
                <Text style={styles.h1Text}>${r.TotalRev}</Text>
                <Text style={styles.h2Text}>REVENUE</Text>
                <View style={styles.sideBySide}>
                  <View style={styles.box}>
                    <Text style={styles.h1Text}>{c.categoryData}</Text>
                    <Text style={styles.h2Text}>CATEGORIES</Text>
                  </View>
                  <View style={styles.box}> 
                    <Text style={styles.h1Text}>{p.productData}</Text>
                    <Text style={styles.h2Text}>PRODUCTS</Text>
                  </View>
                </View>
              </View>
              <Pie />
            </View>
            {sessionData && sessionData.status === 'success' && (
          <Text style={styles.emailText}>Logged in as: {sessionData.user.email}</Text>
          )}
          </ScrollView>
        )}
      </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column: {
    flex: 1,
    minWidth: '40%', // Minimum width for each column to ensure responsiveness
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#27374D',
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  salesBox: {
    flex: 1,
    width: '100%',
    height: 400,
  },
  h1Text: {
    fontSize: 80,
    color: '#DDE6ED',
    fontWeight: 'bold',
  },
  h2Text: {
    fontSize: 20,
    color: '#DDE6ED',
  },
  sideBySide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
});