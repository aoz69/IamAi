import { StyleSheet, View, Text } from 'react-native';
import PieChart from 'react-native-pie-chart';
import React, { Component } from 'react';
import useFetchData  from './fetchTest'
import vars from '../public/vars';

const PieComponent = () => {
  const ip = vars();

  const lowStockData = useFetchData(ip + 'lowstockCount');
  const archivedStockData = useFetchData(ip + 'archivedCount');
  const inStockData = useFetchData(ip + 'inStockCount');
  const soldStockData = useFetchData(ip + 'soldCount');

  const lowStock = parseInt(lowStockData.lowstock);
  const archivedStock = parseInt(archivedStockData.archived);
  const inStock = parseInt(inStockData.stock);
  const soldStock = parseInt(soldStockData.soldStock);

  console.log("lowStockData:", lowStockData);
  console.log("archivedStockData:", archivedStockData);
  console.log("inStockData:", inStockData);
  console.log("soldStockData:", soldStockData);

  
  // if (!lowStock || !archivedStock || !inStock || !soldStock) {
  //   // Data is still being fetched, show loading or a placeholder
  //   return <Text>Loading...</Text>;
  // }

  const total = lowStock + archivedStock +  inStock + soldStock
  const lo = (lowStock/total) * 100
  const ar = (archivedStock/total) * 100
  const is = (inStock/total) * 100
  const ss = (soldStock/total) * 100
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
