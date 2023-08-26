import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import addProduct from './addProduct';


const AddButton = ({ onPress }) => {
  const navigation = useNavigation()

  const navLinks = [
    { label: 'AddProduct', screen: 'AddProduct' },
  ];

  return (
    <>
      <TouchableOpacity
      style={styles.addButton}
      onPress={() => navigation.navigate('AddProduct')}
      >
        <Text>+</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Add some shadow for a raised effect
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AddButton;
