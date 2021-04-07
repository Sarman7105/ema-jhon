import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';


const Review = () => {
	const [cartProducts, setCartProducts] = useState([]);
	const [placedOrder, setPlacedOrder] = useState(false);
	
	useEffect(() => {
		const savedProducts = getDatabaseCart();
		const productKeys = Object.keys(savedProducts);
		const products = productKeys.map((key) => {
			const product = fakeData.find((pd) => pd.key === key);
			product.quantity = savedProducts[key];
			return product;
		});
		setCartProducts(products);
	}, []);

	const removeProduct = (productKey) => {
		const newCartProducts = cartProducts.filter((pd) => pd.key !== productKey);
		setCartProducts(newCartProducts);
		removeFromDatabaseCart(productKey);
		// console.log("remove clicked",productKey);
	};
	
	const history =useHistory()

	const proceedCheckout = () => {
		processOrder();
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
					<ReviewItem removeProduct={removeProduct} key={product.key} product={product} />
				))}
				{ thankYou}
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
