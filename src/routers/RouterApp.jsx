import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from '../components/navbar/';
import Home from '../components/home/';
import Product from '../components/product/';
import MoreProducts from '../components/products_of';

import DashboardRoutesPublic from './DashboardRoutesPublic';
import PublicRouter from './PublicRouter';

const RouterApp = () => {

	const auth = useSelector(state => state.user.auth);
	
	return (
		<Router>
			<Navbar />

			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/productos/:name" component={MoreProducts} />
				<Route exact path="/producto/:id" component={Product} />

				<PublicRouter
					exact
					component={ DashboardRoutesPublic }
					isAuthenticated={ auth.isAuthenticated }
				/>
				
			</Switch>
		</Router>
	)
}

export default RouterApp;