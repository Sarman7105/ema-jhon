import React from 'react';
import './ReviewItem.css'

const ReviewItem = ({ product, removeProduct,quantity }) => {
    // console.log(removeProduct);
    const { name,price,img } = product;
    return (
        <div className="review-product d-flex">
            <div className="me-3">
                <img src={img} alt="product"/>
            </div>
            <div className="ms-3">
                <h4 className="">{name}</h4>
                <p>quantity:{quantity}</p>
                <p><small>price:{ price}</small></p>
                <button
                    onClick={()=>removeProduct(product.key)}
                    className="main-button">
                    Remove
                </button>
            </div>
        </div>
    );
};

export default ReviewItem;