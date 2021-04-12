import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';

const Shipment = () => {
    const[loggedInUser, setLoggedInUser]=useContext(UserContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [shippingData, setShippingData] = useState(null);

    const saveDataToDataBase = (orderDetails) => {
        const url="https://tranquil-river-37561.herokuapp.com/addOrder"
        fetch(url, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('your order placed successfully');
                    processOrder();
		            
                }
            })
    }
    
    const handlePaymentSuccess = (paymentId) => {
        const savedCart = getDatabaseCart();
        const orderDetails = {
            ...loggedInUser,
            products: savedCart,
            shipment: shippingData,
            paymentId: paymentId,
            orderTime:new Date().toDateString()
        }
        // console.log(orderDetails);
        saveDataToDataBase(orderDetails)
            
        }

    const onSubmit = (data) => {
        setShippingData(data);
    }

	// console.log(watch('example')); // watch input value by passing the name of it

	return (
        <div className="row justify-content-center ">
            
            <div className="col-md-6 " style={{display: shippingData? 'none':'block'}}>
            <form className="ship-form " onSubmit={handleSubmit(onSubmit)}>
			<input defaultValue={loggedInUser.name} className="form-control" {...register('name', { required: true })} placeholder="Your Name" />
            {errors.name && <span className="error">Name is required</span>}
            
			<input defaultValue={loggedInUser.email} className="form-control" {...register('email', { required: true })} placeholder="Your Email" />
            {errors.email && <span className="error">Email is required</span>}
            
			<input {...register('address', { required: true })} className="form-control" placeholder="Your Address" />
            {errors.address && <span className="error">Address is required</span>}
            
			<input {...register('phone', { required: true })} className="form-control" placeholder="Your Phone Number" />
			{errors.phone && <span className="error">Phone Number is required</span>}

			<input type="submit" className="form-control" />
		</form>
            </div>
            <div className="m-5 col-md-6" style={{display:shippingData? 'block':'none'}}>
                <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
            </div>
        </div>
	);
};

export default Shipment;
