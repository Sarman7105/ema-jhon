import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
	return (
		<div className="header">
			<img src={logo} alt="" />
			<nav>
				<ul>
                    <Link to="/shop">Shop</Link>
                    <Link to="/review">Review Order</Link>
                    <Link to="/manage">Manage Inventory</Link>
                    <Link to="/login">Login</Link>
				</ul>
			</nav>
		</div>
	);
};

export default Header;
