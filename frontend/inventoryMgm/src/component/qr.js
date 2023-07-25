import React from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import { SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';
import Nav from "../component/nav"
export default function home(){
    const value = "Qr is working" 
    const fColorr = "#FFFFFF"
    const bColorr = "#FFFFFF"

    return (

            <View>
                <Nav/>
                <QRCode value = {value}  bgColor = {bColorr} fgcolor={fColorr}/>
            </View>

        )
    }