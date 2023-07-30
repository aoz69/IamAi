import { StyleSheet, View, Text } from 'react-native';
import PieChart from 'react-native-pie-chart';
import React, { Component } from 'react';

class PieComponent extends Component {
  render() {
    const item1 = 10;
    const item2 = 10;
    const item3 = 50;
    const item4 = 5;
    const item5 = 25;
    const widthAndHeight = 200;
    const series = [item1, item2, item3, item4, item5];
    const sliceColorData = [
      { color: '#ef9b20', name: 'Sales', value: item1 },
      { color: '#edbf33', name: 'Apple', value: item2 },
      { color: '#bdcf32', name: 'Money', value: item3 },
      { color: '#ede15b', name: 'Fire', value: item4 },
      { color: '#edf15b', name: 'Dog', value: item5 },
    ];

    return (
      <View style={styles.container}>
        <View style={styles.pieContainer}>
          <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColorData.map(item => item.color)} />
        </View>
        <View style={styles.colorDetailsContainer}>
          {sliceColorData.map((item, index) => (
            <View key={index} style={styles.colorDetailItem}>
              <View style={[styles.colorSquare, { backgroundColor: item.color }]} />
              <Text style={styles.colorText}>{item.name} {item.value}%</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

export default PieComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Layout children in a row
    margin: '10%',
    marginRight: 0, // Remove right margin to keep the grids side by side
  },
  pieContainer: {
    flex: 1, // Occupy 1/2 of the available space for the pie chart
  },
  colorDetailsContainer: {
    flex: 1, // Occupy 1/2 of the available space for the color details
    marginLeft: 10, // Add some spacing between the pie chart and color details
    marginTop: 30,
  },
  colorDetailItem: {
    flexDirection: 'row', // Layout children in a row
    marginLeft: 30, // Add spacing between color square and color name
    marginBottom: 10,
  },
  colorSquare: {
    width: 20,
    height: 20,
    marginRight: 10, // Add spacing between color square and color name
  },
  colorText: {
    fontSize: 15,
    color: '#27374D',
  },
  valueText: {
    fontSize: 15,
    color: '#27374D',
    marginLeft: 'auto', // Push the value text to the right
  },
});
