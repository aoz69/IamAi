import React from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

export default function home(){
    const value = "Qr is working" 
    const fColorr = "#FFFFFF"
    const bColorr = "#FFFFFF"

    return (
        <> 
            <div>
                <QRCode value = {value}  bgColor = {bColorr} fgcolor={fColorr}/>
            </div>
        </>
        )
    }