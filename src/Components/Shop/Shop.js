import React, { useEffect, useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
	const [products, setProducts] = useState(fakeData.slice(0, 10));
	
	//use state for cart Elements
	const [cart, setCart] = useState([]);

	//use effect to initially load cart data
	useEffect(() => {
		const savedProducts = getDatabaseCart();
		const savedProductKeys = Object.keys(savedProducts);
		const previousProducts = savedProductKeys.map((key) => {
			let product = fakeData.find((pd) => pd.key === key);
			product.quantity = savedProducts[savedProductKeys];
			return product;
		});
		setCart(previousProducts);
	},[])

	//Event handler for add to cart button
	const handleCart = (product) => {
		const key = product.key;
		const existingProduct = cart.find((pd) => pd.key === key);
		let count = 1;
		let newCart;
		if (existingProduct) {
			count = existingProduct.quantity + 1;
			existingProduct.quantity = count;
			const otherProducts = cart.filter((pd) => pd.key !== key);
			newCart = [...otherProducts, existingProduct];
		}
		else {
			product.quantity = count;
			newCart = [...cart, product];
		}
		// newCart = [...cart, product];
		setCart(newCart);
		// const sameProduct = newCart.filter(pd => pd.key === product.key);
		addToDatabaseCart(product.key, count);
	};
	return (
		<div className="shop-container">
            <div className="product-container">
				{products.map((pd) => <Product
					key={pd.key}
					product={pd}
					showAddToCart={true}
					handleCart={handleCart}
				></Product>)}
            </div>
			<div className="cart-container">
				<Cart cart={cart}>
					<Link to="/review">
						<button className="main-button">Review Order</button>
					</Link>
				</Cart>
			</div>
		</div>
		
	);
};

export default Shop;
