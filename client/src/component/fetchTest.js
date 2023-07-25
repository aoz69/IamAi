import { useState, useEffect } from "react";
import React from 'react';

function FetchTest() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/admin')
            .then(res => {
                if (res.ok) {
                    console.log("Connected to backend");
                    return res.json(); // Parse the JSON response
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                setMessage(data.message); // Extract the "message" field from the JSON response
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // The empty dependency array makes sure this effect runs only once on mount

    // Rendering message
    return (
        <div>
            <p>{message}</p>
        </div>
    );
}

export default FetchTest;
