import React from 'react';

import { AdminStyle } from '../style';

import { Paper } from '@material-ui/core';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import EditIcon from '@material-ui/icons/Edit';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import HistoryIcon from '@material-ui/icons/History';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';

const AdminPage = ({ history, role }) => (
	<AdminStyle className="my-5">
		<h2 className="mb-5">Administrar ecomerce</h2>
		
		<Paper elevation={3} className="d-flex flex-wrap justify-content-center pt-4">
			{
				role === 'MODERATOR_ROLE' ? null
				: <div className="text-center mb-4 mr-4">
					<p className="mb-1">Agregar producto en home</p>
					<AddBoxOutlinedIcon
						fontSize="large"
						className="icon"
						onClick={() => history.push('/admin/agregar-producto-home')}
					/>
				</div>
			}

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

			{
				role === 'MODERATOR_ROLE' ? null
				: <div className="text-center mb-4 mr-4">
					<p className="mb-1">Administrar usuarios</p>
					<AssignmentIndOutlinedIcon
						fontSize="large"
						className="icon"
						onClick={() => history.push('/admin/administrar-usuarios')}
					/>
				</div>
			}

		</Paper>
	</AdminStyle>
)

export default AdminPage;