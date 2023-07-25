import { StyleSheet, Text,View,ScrollView, Button } from 'react-native'
import React, { Component } from 'react'
import PieChart from 'react-native-pie-chart'
import Nav from '../component/nav'
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

export default class TestChart extends Component {
  render() {
    const item1 = 100;
    const item2 = 15;
    const item3 = 200;
    const item4 = 70;
    const item5 = 500;
    const widthAndHeight = 250
    const series = [item1, item2, item3,item4 ,item5 ]
    const sliceColor = ['#ef9b20', '#edbf33', '#ede15b', '#bdcf32 ', '#27aeef' ]
    return (
        <>
        <View>
          <Nav />
        </View>

        <View style = {styles.displayGrid}>
        <div>
            <h1 style = {styles.heading}>Menu</h1>
            <Button
                title="Profile"
                onPress={() => navigation.navigate('Profile')}
                color="#ef9b20"
            />
            <Button
                title="Products"
                onPress={() => navigation.navigate('Products')}
                color="#edbf33"
            />
            <Button
                title="Analysis Tools"
                onPress={() => navigation.navigate('Analysis')}
                color="#bdcf32"
            />
            <Button
                title="Categories"
                onPress={() => navigation.navigate('Categories')}
                color="#ede15b"
            />
        </div>
        <div>
        <h1 style = {styles.heading}>Dashboard</h1>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Basic</Text>
                    <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} />
                </View>
            </View>
        </div>
        <div>
        <h1 style = {styles.heading}>Overview</h1>
            
        </div>
 
         </View>
                
        </>
    );
  }  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    float : 'left',
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
  displayGrid:{
    display: "grid",
    gridTemplateColumns: '25% 45% 25%',
    gridGap: '5%',
  },
  heading:{
    textAlign: 'center'
  }
});