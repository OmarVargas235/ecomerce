import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CreateProduct from '../components/create-product/';
import EditUser from '../components/edit-user/';
import MineProducts from '../components/mine-products/';
import Notifications from '../components/notifications/';
import Chat from '../components/chat/';
import Profile from '../components/profile';
import EditProduct from '../components/edit-product';

const DashboardRoutesPrivate = () => (		
	<Switch>
		<Route exact path="/crear-producto" component={CreateProduct} />
		<Route exact path="/editar-perfil" component={EditUser} />
		<Route exact path="/mis-productos" component={MineProducts} />
		<Route exact path="/notificaciones" component={Notifications} />
		<Route exact path="/mensajes" component={Chat} />
		<Route exact path="/mi-perfil" component={Profile} />
		<Route exact path="/editar-producto" component={EditProduct} />

		<Redirect to="/" />
	</Switch>
)

export default DashboardRoutesPrivate;