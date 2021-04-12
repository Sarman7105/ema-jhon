import React, { useContext, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import './Login.css';
import firebaseConfig from './FirebaseConfig';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import SignIn from '../SignIn/SignIn';
import CreateAccount from '../CreateAccount/CreateAccount';

firebase.initializeApp(firebaseConfig);

const Login = () => {
	const [ user, setUser ] = useState({
		name: '',
		password: '',
		email: ''
	});

	const [ loggedInUser, setLoggedInUser ] = useContext(UserContext);
	const [ newUser, setNewUser ] = useState(false);
	const [ hasAccount, setHasAccount ] = useState(true);
	const [ error, setError ] = useState('');

	let history = useHistory();
	let location = useLocation();
	let { from } = location.state || { from: { pathname: '/' } };

	const validateEmail = (email) => {
		const regularExp = /\S+@\S+\.\S+/;
		const isValid = regularExp.test(email);
		if (!isValid) {
			setError('Please Enter valid Email');
		} else {
			setError('');
		}
		return isValid;
	};
	const validatePassword = (password) => {
		const regularExp = /\d{1,}/;
		const isValid = password.length >= 6 && regularExp.test(password);
		if (!isValid) {
			setError('Password length must be 6 and contain atleast a number');
		} else {
			setError('');
		}
		return isValid;
	};

	const handleBlur = (event) => {
		// console.log(event.target.name);
		const inputType = event.target.name;
		const inputValue = event.target.value;
		let isFieldValid = true;
		if (inputType === 'email') {
			isFieldValid = validateEmail(inputValue);
			// console.log(inputValue);
		}
		if (inputType === 'password') {
			isFieldValid = validatePassword(inputValue);
			// console.log(inputValue);
		}
		if (isFieldValid) {
			const newUser = { ...user };
			newUser[inputType] = inputValue;
			setUser(newUser);
		}
	};

	const updateUserName = (name) => {
		const user = firebase.auth().currentUser;
		console.log(name);
		user.updateProfile({
				displayName: name
			})
			.then(function () {
				updateUserInfo(user);
				// console.log("Name set Successfully");
			})
			.catch(function(error) {
				console.log("name set failed  ",error)
			});
	};

	const updateUserInfo = (data) => {
		console.log(data);
		const newUser = { ...user };
		newUser.name = data.displayName;
		newUser.email = data.email;
		newUser.password = '';
		setLoggedInUser(newUser);
	}

	const handleCreate = (event) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(user.email, user.password)
			.then((userCredential) => {
				// Signed in
				const userData = userCredential.user;
				updateUserName(user.name)
				alert('you have successfully loggedIn');
				history.replace(from);
				// ...
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorMessage);
			});
		event.preventDefault();
	};
	const handleSignIn = (event) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(user.email, user.password)
			.then((userCredential) => {
				const user = userCredential.user;
				updateUserInfo(user);
				sessionStorage.setItem('token', user.email);
				alert('you have successfully loggedIn');
				history.replace(from);
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorMessage);
			});
		event.preventDefault();
	};
	
	return (
		<div className="container">
			{error && <p className="text-danger">{error}</p>}
			<div className="">
				{hasAccount ? (
					<SignIn handleBlur={handleBlur} handleSignIn={handleSignIn} setHasAccount={setHasAccount} />
				) : (
					<CreateAccount handleBlur={handleBlur} handleCreate={handleCreate} setHasAccount={setHasAccount} />
				)}
			</div>
		</div>
	);
};

export default Login;
