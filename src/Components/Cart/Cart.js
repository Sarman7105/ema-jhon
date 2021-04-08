import React, { useEffect, useState } from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';
import './cart.css';

const Cart = ({ cart, children }) => {
    let savedProducts = getDatabaseCart();

    
    let productPrice = 0;
    let orderQuantity = 0;
    
    cart.forEach(x => {
        const key = x.key;
        let quantity = savedProducts[key];
        productPrice = productPrice + (x.price * quantity);
        orderQuantity += quantity;
        // console.log(key,savedProducts[key]);
    })
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
            <p>Items Ordered: {orderQuantity}</p>
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