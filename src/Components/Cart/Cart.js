import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';
import './cart.css';

const Cart = ({ cart,children }) => {
    const productPrice = Number(cart.reduce((price, x) => price + (x.price*x.quantity), 0).toFixed(2));
    let shippingCost = 12.49;
    if (productPrice === 0) {
        shippingCost = 0;
    }
    else if(productPrice > 15 && productPrice < 35){
        shippingCost =4.99
    }
    else if(productPrice > 35){
        shippingCost = 0;
    }
    let vat = (productPrice * 0.1).toFixed(2);
    return (
        <div className="cart">
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price {productPrice}</p>
            <p><small>Shipping Cost: {shippingCost}</small></p>
            <p><small>vat: {vat}</small></p>
            <hr/>
            <h2>Total Price {(productPrice + shippingCost + Number(vat)).toFixed(2)}</h2>
            {children}
        </div>
    );
};

export default Cart;