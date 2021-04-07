import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = ({product,handleCart,showAddToCart}) => {
    const { name, img, seller, stock, price, key } = product;
    // console.log(product);
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div className="product-info">
                <h4> <Link to={"/product/"+key}>{name}</Link> </h4>
                <p><small>by {seller}</small></p>
                <p>${price}</p>
                <p><small>only {stock} left -order soon</small></p>
                { showAddToCart &&<button className="main-button" onClick={()=>handleCart(product)}>
                    <FontAwesomeIcon icon={faShoppingCart} /> add to cart </button> }
                
            </div>
        </div>
    );
};

export default Product;