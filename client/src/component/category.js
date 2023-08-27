import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import useFetchData from './fetchTest';
import vars from '../public/vars';
import Addbtn from '../component/addBtn';
import imgg from '../public/images/1.jpg';

const ListWithButtons = ({ data, screenName, handleEdit, handleDelete }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item === selectedItem ? null : item);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {data && data.map((item) => (
          <TouchableOpacity key={item._id} onPress={() => handleItemClick(item)}>
            <View style={styles.row}>
              <View style={styles.firstColumn}>
                <Image source={imgg} style={styles.productImage} />
              </View>
              <View style={styles.secondColumn}>
                <Text>
                  <Text style={styles.productName}>
                    Id: 
                  </Text>
                  {item._id}
                </Text>
                <Text>
                  <Text style={styles.productName}>
                    Name: 
                  </Text>
                  {item.name}
                </Text>
              </View>
              {selectedItem === item && (
                <View style={styles.editDeleteContainer}>
                  <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
        <Addbtn screen={screenName} />
      </View>
    </ScrollView>
  );
};

const PieComponent = () => {
  const ip = vars();
  const products = useFetchData(ip + 'fetchProducts');
  const categories = useFetchData(ip + 'fetchCate');

  const handleProductEdit = (product) => {
    // Implement edit logic using the selected product
  };

  const handleProductDelete = (product) => {
    // Implement delete logic using the selected product
  };

  const handleCategoryEdit = (category) => {
    // Implement edit logic using the selected category
  };

  const handleCategoryDelete = (category) => {
    // Implement delete logic using the selected category
  };

  return (
    <View style={styles.container}>
      <ListWithButtons
        data={categories.category}
        screenName="AddCategory"
        handleEdit={handleCategoryEdit}
        handleDelete={handleCategoryDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
  },
  firstColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondColumn: {
    flex: 2,
  },
  productImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  productName: {
    fontWeight: 'bold',
  },
  editDeleteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#27374d',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#27374d',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PieComponent;
