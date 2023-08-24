import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useFetchData from './fetchTest';
import vars from '../public/vars';
import Addbtn from '../component/addBtn'


const PieComponent = () => {
  const ip = vars();
  const category = useFetchData(ip + 'fetchCate');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cate ID</Text>
        <Text style={styles.headerText}>Name</Text>
      </View>

      {category.category &&
        category.category.map((category) => (
          <View style={styles.row} key={category._id}>
            <Text style={styles.column}>{category._id}</Text>
            <Text style={styles.column}>{category.name}</Text>

          </View>
        ))}
        <Addbtn />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
  },
  column: {
    flex: 1,
    fontSize: 14,
  },
});

export default PieComponent;
