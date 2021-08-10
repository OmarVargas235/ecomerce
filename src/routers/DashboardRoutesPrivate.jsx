import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CreateProduct from '../components/create-product/';
import EditUser from '../components/edit-user/';
import MineProducts from '../components/mine-products/';
import Notifications from '../components/notifications/';
import Chat from '../components/chat/';
import Profile from '../components/profile/';
import EditProduct from '../components/edit-product/';
import EditImgProfile from '../components/edit-img-profile/';
import Favorites from '../components/products-favorites/';
import ProductLocation from '../components/product-location/';
import ListConnected from '../components/connected/';
import Orders from '../components/orders/';
import Admin from '../components/admin/';
import AddProductHome from '../components/admin/container/AddProductHome';
import EditProductAdmin from '../components/admin/container/EditProductAdmin';
import DeleteProductAdmin from '../components/admin/container/DeleteProductAdmin';
import RecordAdmin from '../components/admin/container/RecordAdmin';

const DashboardRoutesPrivate = () => (		
	<Switch>
		<Route exact path="/mi-perfil" component={Profile} />
		<Route exact path="/fotografia" component={EditImgProfile} />
		<Route exact path="/favoritos" component={Favorites} />
		<Route exact path="/mis-productos" component={MineProducts} />
		<Route exact path="/crear-producto" component={CreateProduct} />
		<Route exact path="/editar-perfil" component={EditUser} />
		<Route exact path="/notificaciones" component={Notifications} />
		<Route exact path="/mensajes" component={Chat} />
		<Route exact path="/ubicacion-producto" component={ProductLocation} />
		<Route exact path="/conectados" component={ListConnected} />
		<Route exact path="/ordenes" component={Orders} />
		<Route exact path="/admin" component={Admin} />
		<Route exact path="/admin/agregar-producto-home" component={AddProductHome} />
		<Route exact path="/admin/editar-producto" component={EditProductAdmin} />
		<Route exact path="/admin/eliminar-producto" component={DeleteProductAdmin} />
		<Route exact path="/admin/historial-ordenes" component={RecordAdmin} />
		<Route exact path="/editar-producto/:id" component={EditProduct} />

		<Redirect to="/" />
	</Switch>
)

export default DashboardRoutesPrivate;