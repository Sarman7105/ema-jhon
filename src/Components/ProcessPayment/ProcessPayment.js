import React from 'react';
import { Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IeO8tKqs1dGt5xVScb8NPy1VOJBRqiTzk9DPeBhVPcjHylfm1UBOsXhN9ZV1Wk7nwL0dK3ubBfzxzAQZF0CeY6h00yNeXcobe');

const ProcessPayment = ({handlePayment}) => {
	return (
		<Elements stripe={stripePromise}>
			<SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
		</Elements>
	);
};
export default ProcessPayment;
