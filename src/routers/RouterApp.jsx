import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { loadingAction, logoutUser } from '../redux/actions/userAction';
import Navbar from '../components/navbar/';
import Home from '../components/home/';
import Product from '../components/product/';
import MoreProducts from '../components/products_of/';
import ProductsSearch from '../components/products-search/';

import { SocketContext } from '../context/SocketContext';

import DashboardRoutesPublic from './DashboardRoutesPublic';
import DashboardRoutesPrivate from './DashboardRoutesPrivate';
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';

const RouterApp = () => {
	
	const dispatch = useDispatch();

	const { auth, dataUser, loading } = useSelector(state => state.user);

	const { socket } = useContext( SocketContext );
	
	useEffect(() => dispatch( loadingAction() ), [dispatch]);

	// Cuando este autenticado el usuario se conecta al servidor
  	useEffect(() => {
  		
  		if (auth.isAuthenticated) {

  			window.localStorage.setItem('id-user', JSON.stringify(dataUser.uid));
	  		socket.emit('connect-user', dataUser.uid);

  		} else {

  			const getLS = window.localStorage.getItem('id-user');

  			if (getLS === 'undefined') return logoutUser();

  			socket.emit('disconnect-user', JSON.parse(getLS));
  		}


		return () => {

			socket.off('connect-user');
			socket.off('disconnect-user');
		}
  		
  	}, [auth, dataUser, socket]);
	
	return (
		<Router>
			<Navbar />

			{
				loading ? <div>Cargando</div>
				: <Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/productos/:id" component={MoreProducts} />
					<Route exact path="/producto/:id" component={Product} />
					<Route exact path="/products-search" component={ProductsSearch} />

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