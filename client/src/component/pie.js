import { StyleSheet,View } from 'react-native';
import PieChart from 'react-native-pie-chart';
import React, { Component } from 'react';

class pie extends Component{
    render(){
        const item1 = 100;
        const item2 = 15;
        const item3 = 200;
        const item4 = 70;
        const item5 = 500;
        const widthAndHeight = 200
        const series = [item1, item2, item3,item4 ,item5 ]
        const sliceColor = ['#ef9b20', '#edbf33', '#bdcf32', '#ede15b', '#edf15b']
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} />
                </View>
            </View>
        );
    }
}
export default pie;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      // float : 'left',
      margin: '1%',
    },
    innerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      margin: 10,
    },
  });
