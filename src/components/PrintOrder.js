import React, { useState, useEffect } from 'react'
import { Table, Card, Button } from 'reactstrap';

const PrintOrder = (
    list
) => {
    const handlePrint = () => {
        window.print();
    }
    
    return (

        <h1>
           printOrder {list.length}
        </h1>
    )
}

export default PrintOrder