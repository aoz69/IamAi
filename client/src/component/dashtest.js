import { StyleSheet, Text,View,ScrollView, Button } from 'react-native'
import React from 'react'
import Nav from '../component/nav'
import Pie from '../component/pie'
import {useNavigation} from '@react-navigation/core'



export default function dash(){
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
  }
});