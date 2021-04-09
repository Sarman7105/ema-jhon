import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
	const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        const url="http://localhost:5055/addOrder"
        const savedCart=getDatabaseCart();
        const orderDetails={...loggedInUser,products:savedCart,shipment:data}
        // console.log(data);
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
    const[loggedInUser, setLoggedInUser]=useContext(UserContext);

	console.log(watch('example')); // watch input value by passing the name of it

	return (
        <div className="row">
            
            <div className="col-md-6">
                <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
			<input defaultValue={loggedInUser.name} {...register('name', { required: true })} placeholder="Your Name" />
            {errors.name && <span className="error">Name is required</span>}
            
			<input defaultValue={loggedInUser.email} {...register('email', { required: true })} placeholder="Your Email" />
            {errors.email && <span className="error">Email is required</span>}
            
			<input {...register('address', { required: true })} placeholder="Your Address" />
            {errors.address && <span className="error">Address is required</span>}
            
			<input {...register('phone', { required: true })} placeholder="Your Phone Number" />
			{errors.phone && <span className="error">Phone Number is required</span>}

			<input type="submit" />
		</form>
            </div>
            <div className="col-md-6"></div>
        </div>
	);
};

export default Shipment;
