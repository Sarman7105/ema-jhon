import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';


const Review = () => {
	const [cartProducts, setCartProducts] = useState([]);
	const [placedOrder, setPlacedOrder] = useState(false);
	 let savedProducts = getDatabaseCart();
	
	useEffect(() => {
		const savedProducts = getDatabaseCart();
		const productKeys = Object.keys(savedProducts);
		const url = `https://tranquil-river-37561.herokuapp.com/productsByKeys`;
		fetch(url, {
			method: 'POST',
			headers: {
				'content-Type': 'application/json'
			},
			body: JSON.stringify(productKeys)
		})
			.then(res => res.json())
			.then(data => setCartProducts(data));

	}, []);

	const removeProduct = (productKey) => {
		const newCartProducts = cartProducts.filter((pd) => pd.key !== productKey);
		setCartProducts(newCartProducts);
		removeFromDatabaseCart(productKey);
		// console.log("remove clicked",productKey);
	};
	
	const history =useHistory()

	const proceedCheckout = () => {
		setCartProducts([]);
		history.push("/shipment");
	}
	let thankYou;
	if (placedOrder) {
		thankYou=<img src={happyImage} alt=""/>
	}
	return (
		<div className="shop-container">
			<div className="product-container">
				{cartProducts.map((product) => (
					<ReviewItem removeProduct={removeProduct} quantity={savedProducts[product.key]} key={product.key} product={product} />
				))}
				{ thankYou }
			</div>
			<div className="cart-container">
				<Cart cart={cartProducts}>
					<button className="main-button" onClick={proceedCheckout}>proceed checkout</button>
				</Cart>
			</div>
		</div>
	);
};

export default Review;
