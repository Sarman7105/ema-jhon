import React from 'react';
import './ReviewItem.css'

const ReviewItem = ({ product, removeProduct}) => {
    // console.log(removeProduct);
    const { name, quantity,price } = product;
    return (
        <div className="review-product">
            <h4 className="">{name}</h4>
            <p>quantity:{quantity}</p>
            <p><small>price:{ price}</small></p>
            <button
                onClick={()=>removeProduct(product.key)}
                className="main-button">
                Remove</button>
        </div>
    );
};

export default ReviewItem;