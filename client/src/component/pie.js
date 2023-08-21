import { StyleSheet, View, Text } from 'react-native';
import PieChart from 'react-native-pie-chart';
import React, { Component } from 'react';
import useFetchData  from './fetchTest'


const PieComponent = () => {
  const lowStock = useFetchData('http://192.168.1.75:3000/lowstockCount');
  const archivedStock = useFetchData('http://192.168.1.75:3000/archivedCount');
  const inStock = useFetchData('http://192.168.1.75:3000/inStockCount');
  const soldStock = useFetchData('http://192.168.1.75:3000/soldCount');

  
  if (!lowStock | !archivedStock | !inStock | !soldStock ) {
    return <Text>Fetching Products is taking longer than usual</Text>;
  }

  // const stockCountsArray = products.stock.map(item => item.status);
  // const widthAndHeight = 200;
  // const series = stockCountsArray; 
  // const sliceColorData = [
  //   { color: '#ef9b20', name: stockCountsArray[0], value: 5},
  //   { color: '#edbf33', name: stockCountsArray[1], value:  20},
  //   { color: '#bdcf32', name: stockCountsArray[2], value:  10},
  //   { color: '#bddf32', name: stockCountsArray[2], value:  10},

  const total = lowStock.lowstock + archivedStock.stock +  inStock.lowstock + soldStock.soldStock
  const lo = (lowStock.lowstock/total) * 100
  const ar = (archivedStock.stock/total) * 100
  const is = (inStock.lowstock/total) * 100
  const ss = (soldStock.soldStock/total) * 100


    const lowStocks = lo;
    const archivedStocks = ar;
    const inStocks = is;
    const soldStocks = ss;
    const widthAndHeight = 200;
    const series = [lowStocks, archivedStocks, inStocks, soldStocks];
    const sliceColorData = [
      { color: '#ef9b20', name: 'Low stock', value: lowStocks },
      { color: '#edbf33', name: 'Archived', value: archivedStocks },
      { color: '#bdcf32', name: 'In stock', value: inStocks },
      { color: '#ede15b', name: 'Sold', value: soldStocks },
    ];

  return (
    <View style={styles.container}>
      <View style={styles.pieContainer}>
        {/* <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColorData.map(item => item.color)} /> */}
        <PieChart
                widthAndHeight={widthAndHeight}
                series={series}
                sliceColor={sliceColorData.map(item => item.color)}
                coverRadius={.5}
              />
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
};

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
