import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity,View } from 'react-native'


export default function home(){
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Login</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Username:</Text>
                <TextInput style={styles.input} placeholder="Enter your username" />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password:</Text>
                <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry={true} />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => console.log('Login')}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
        )
    }

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

