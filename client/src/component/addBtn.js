import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Text style={styles.addButtonLabel}>+</Text>
    </TouchableOpacity>
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
