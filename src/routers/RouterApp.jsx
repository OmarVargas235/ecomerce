import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { loadingAction } from '../redux/actions/userAction';
import Navbar from '../components/navbar/';
import Home from '../components/home/';
import Product from '../components/product/';
import MoreProducts from '../components/products_of/';

import DashboardRoutesPublic from './DashboardRoutesPublic';
import DashboardRoutesPrivate from './DashboardRoutesPrivate';
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';

const RouterApp = () => {
	
	const dispatch = useDispatch();

	const { auth, loading } = useSelector(state => state.user);

	useEffect(() => dispatch( loadingAction() ), [dispatch]);
	
	return (
		<Router>
			<Navbar />

			{
				loading ? <div>Cargando</div>
				: <Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/productos/:name" component={MoreProducts} />
					<Route exact path="/producto/:id" component={Product} />

					{
						auth.isAuthenticated
						? <PrivateRouter
							exact
							component={ DashboardRoutesPrivate }
							isAuthenticated={ auth.isAuthenticated }
						/>
						: <PublicRouter
							exact
							component={ DashboardRoutesPublic }
							isAuthenticated={ auth.isAuthenticated }
						/>	
					}
				</Switch>
			}

		</Router>
	)
}

export default RouterApp;