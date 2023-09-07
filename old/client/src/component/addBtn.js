import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddButton = ({screen}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate(screen)}
      >
        <Text style={styles.addButtonLabel}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 70, // Adjust this value to leave space for the button
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Add some shadow for a raised effect
    position: 'absolute',
    bottom: 20, // Adjust this value to control the distance from the bottom
    left: 20, // Adjust this value to control the distance from the left
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AddButton;
