import React from 'react';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import './Navigation.css';

function Navigation({ isLoaded }) {
	// const sessionUser = useSelector(state => state.session.user);

	const login = (
		<li>
			<Link className="user-links" to="/login">Log in</Link>
		</li>
	)

	const signup = (
		<li>
			<Link className="user-links" id="nav-signup-button" to="/signup">Sign up for free</Link>
		</li>
	)

	return (
		<nav className="navbar">
			<div className="container">
				<Link className="logo" to="/"></Link>

				<ul className="navbar-right-nav">
					{login}
					{signup}
				</ul>
			</div>
		</nav>
	);
}

export default Navigation;
