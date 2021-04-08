import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    useEffect(() => {
        const url = `http://localhost:5055/product/${productId}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setProduct(data)
            });
    },[productId])
    return (
        <div className="product-container">
            <Product product={product[0]} showAddToCart={false}></Product>
        </div>
    );
};

export default ProductDetails;