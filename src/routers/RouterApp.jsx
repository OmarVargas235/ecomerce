import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from '../components/navbar/';
import Home from '../components/home/';
import Product from '../components/product/';
import MoreProducts from '../components/products_of/';
import CreateProduct from '../components/create-product/';
import EditUser from '../components/edit-user/';
import MineProducts from '../components/mine-products/';
import Notifications from '../components/notifications/';
import Chat from '../components/chat/';

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

				<Route exact path="/crear-producto" component={CreateProduct} />
				<Route exact path="/editar-perfil" component={EditUser} />
				<Route exact path="/mis-productos" component={MineProducts} />
				<Route exact path="/notificaciones" component={Notifications} />
				<Route exact path="/mensajes" component={Chat} />

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