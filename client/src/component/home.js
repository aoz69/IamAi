import { StyleSheet, Text, TextInput, TouchableOpacity,View,ScrollView } from 'react-native'
import React, { Component } from 'react'
import PieChart from 'react-native-pie-chart'

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
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Basic</Text>
            <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} />
            <Text style={styles.title}>Doughnut</Text>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
              coverRadius={0.45}
              coverFill={'#FFFF'}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
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