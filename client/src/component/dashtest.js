import { StyleSheet, Text,View,ScrollView, Button } from 'react-native'
import React from 'react'
import Nav from '../component/nav'
import Menu from '../component/Menu'
import Pie from '../component/pie'

export default function dash(){
    return(
        <>
        <View>
          <Nav />
        </View>

          <View style = {styles.displayGrid}>
          <div style={styles.gridBox}>
            <Menu />
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
  displayGrid:{
    display: "grid",
    gridTemplateColumns: '25% 45% 25%',
    gridGap: '5%',
  },
  heading:{
    textAlign: 'center'
  },
  gridBox:{
    textAlign: 'center',
    justifyContent: "center",
    alignItems: 'center'
  }
});