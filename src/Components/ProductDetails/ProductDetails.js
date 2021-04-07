import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const { productId } = useParams();
    const product = fakeData.find(pd => pd.key === productId);
    console.log(product);
    return (
        <div className="product-container">
            <Product product={product} showAddToCart={false}></Product>
        </div>
    );
};

export default ProductDetails;