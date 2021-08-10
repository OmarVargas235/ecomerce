import React from 'react';

import { AdminStyle } from '../style';
import Spinner from '../../../layaut/Spinner';

import { Container, Paper } from '@material-ui/core';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import EditIcon from '@material-ui/icons/Edit';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import HistoryIcon from '@material-ui/icons/History';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import { Alert } from '@material-ui/lab';

const AdminPage = ({ history, role }) => (
	<AdminStyle className="my-5">
		<Container maxWidth="sm">
			{
				!role ? <Spinner />
				: <React.Fragment>
					{
						role === 'USER_ROLE'
						? <Alert variant="filled" severity="error"><strong>No tienes permisos de administrador</strong></Alert>
						: <React.Fragment>
							<h2 className="mb-5">Administrar ecomerce</h2>

							<Paper elevation={3} className="d-flex flex-wrap justify-content-center pt-4">
								<div className="text-center mb-4 mr-4">
									<p className="mb-1">Agregar producto en home</p>
									<AddBoxOutlinedIcon
										fontSize="large"
										className="icon"
										onClick={() => history.push('/admin/agregar-producto-home')}
									/>
								</div>

								<div className="text-center mb-4 mr-4">
									<p className="mb-1">Editar producto</p>
									<EditIcon
										fontSize="large"
										className="icon"
										onClick={() => history.push('/admin/editar-producto')}
									/>
								</div>

								<div className="text-center mb-4 mr-4">
									<p className="mb-1">Eliminar producto</p>
									<BackspaceOutlinedIcon
										fontSize="large"
										className="icon"
										onClick={() => history.push('/admin/eliminar-producto')}
									/>
								</div>

								<div className="text-center mb-4 mr-4">
									<p className="mb-1">Ver historial de ordenes</p>
									<HistoryIcon
										fontSize="large"
										className="icon"
										onClick={() => history.push('/admin/historial-ordenes')}
									/>
								</div>

								<div className="text-center mb-4 mr-4">
									<p className="mb-1">Administrar usuarios</p>
									<AssignmentIndOutlinedIcon fontSize="large" className="icon" />
								</div>
							</Paper>
						</React.Fragment>
					}
				</React.Fragment>
			}
		</Container>
	</AdminStyle>
)

export default AdminPage;