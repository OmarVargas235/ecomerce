import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './assets/bootstrap.css';
import Navbar from './components/navbar/';
import Header from './components/header/';
import CreateAccount from './components/create-account/';
import Login from './components/login/';

const App = () => {
	
	return (
		<Router>
			<Navbar />

			<Switch>
				<Route exact path="/" component={Header} />
				<Route exact path="/crear-cuenta" component={CreateAccount} />
				<Route exact path="/iniciar-sesion" component={Login} />

				<Redirect to="/" />
			</Switch>
		</Router>
	)
}

export default App;