import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Admin from '../components/admin/';
import AddProductHome from '../components/admin/container/AddProductHome';
import EditProductAdmin from '../components/admin/container/EditProductAdmin';
import DeleteProductAdmin from '../components/admin/container/DeleteProductAdmin';
import RecordAdmin from '../components/admin/container/RecordAdmin';
import ManageUsers from '../components/admin/container/ManageUsers';
import Spinner from '../layaut/Spinner';

import Container from '@material-ui/core/Container';
import { Alert } from '@material-ui/lab';

const RoutesAdmin = () => {

	const { dataUser:{role} } = useSelector(state => state.user);

	console.log(role);
	
	return (
		<Container maxWidth="sm" className="my-5">
			{
				!role ? <Spinner />
				: <React.Fragment>				
					{
						role === 'USER_ROLE'
						? <Alert variant="filled" severity="error"><strong>No tienes permisos de administrador</strong></Alert>
						: <Switch>
							<Route exact path="/admin" component={Admin} />
							<Route exact path="/admin/agregar-producto-home" component={AddProductHome} />
							<Route exact path="/admin/editar-producto" component={EditProductAdmin} />
							<Route exact path="/admin/eliminar-producto" component={DeleteProductAdmin} />
							<Route exact path="/admin/historial-ordenes" component={RecordAdmin} />
							<Route exact path="/admin/administrar-usuarios" component={ManageUsers} />
						</Switch>
					}
				</React.Fragment>
			}
		</Container>
	)
}

export default RoutesAdmin;