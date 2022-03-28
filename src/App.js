import './App.css';
import React, { useState, useEffect } from 'react';

import axios from "axios";

import Pos from './pages/Pos';



function App() {


    return (

        <div>
            <div style={{
                height: 70,
                fontFamily: 'Lobster',
                textAlign: "left",
                padding: 10,
                color: "#522E2A"
            }} >
                <h2>Zina Cafe</h2>
            </div>
            <Pos />
        </div>
    );
}

export default App;
