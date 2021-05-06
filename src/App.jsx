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
import ChangePassword from './components/change-password';
import FormChangePassword from './components/change-password/container/FormChangePassword';

const Body = createGlobalStyle`
	main, section {
		background-color: #EDEDED;
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
					<Route exact path="/cambiar-contraseña" component={ChangePassword} />
					<Route exact path="/formulario_cambiar_contraseña/:token" component={FormChangePassword} />

					<Redirect to="/" />
				</Switch>
		</Router>
	)
}

export default App;