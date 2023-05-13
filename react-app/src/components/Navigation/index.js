import React from 'react';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import './Navigation.css';

function Navigation({ isLoaded }) {
	// const sessionUser = useSelector(state => state.session.user);

	const login = (
		<li>
			<Link class="user-links" to="/login">Log in</Link>
		</li>
	)

	const signup = (
		<li>
			<Link class="user-links" id="nav-signup-button" to="/signup">Sign up for free</Link>
		</li>
	)

	return (
		<nav class="navbar">
			<div class="container">
				<Link class="logo" to="/"></Link>

				<ul class="navbar-right-nav">
					{login}
					{signup}
				</ul>
			</div>
		</nav>
	);
}

export default Navigation;
