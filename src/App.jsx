import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import './assets/bootstrap.css';
import Navbar from './components/navbar/';
import Home from './components/home/';
import CreateAccount from './components/create-account/';
import Login from './components/login/';
import Product from './components/product/';
import MoreProducts from './components/products_de';

const Body = createGlobalStyle`
	main, section {
		background-color: #F6F6F6;
	}
`;

const App = () => {
	
	return (
		<Router>
			<Body />

			<Navbar />

			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/crear-cuenta" component={CreateAccount} />
				<Route exact path="/iniciar-sesion" component={Login} />
				<Route exact path="/productos/:name" component={MoreProducts} />
				<Route exact path="/producto/:id" component={Product} />

				<Redirect to="/" />
			</Switch>
		</Router>
	)
}

export default App;