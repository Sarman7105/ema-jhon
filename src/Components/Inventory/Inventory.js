import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
    const handleAddProduct = () => {
        console.log("adding product");
        // fetch("http://localhost:5055/addProducts", {
        //     method: 'POST',
        //     headers: {
        //         "content-type": "application/json"
        //     },
        //     body: JSON.stringify(fakeData)
        // })
    }
    return (
        <div className="container">
            <button className="btn btn-success" onClick={handleAddProduct}>Submit</button>
        </div>
    );
};

export default Inventory;