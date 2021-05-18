import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { styleMaterialUiTheme } from '../utils/styleMaterialUi';
import { ControlPanelStyle } from './style';

import { Grid, Divider } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const ControlPanel = ({ component:Component, history, title, text }) => {
	
	const { name, lastName } = useSelector(state => state.user.dataUser);

	const theme = styleMaterialUiTheme();

	return (
		<ControlPanelStyle className="px-4 px-md-3 container-md my-4">
			<ThemeProvider theme={theme}>
				<Grid container className="box">
					<Grid item xs={12} sm={3} className="divider-horizontal">
		        		<div className="text-left text-sm-center pl-4 pl-sm-0 mb-4 mt-3 overflow-hidden">
		        			<AccountCircleIcon
		        				className="icon"
		        				color="secondary"
		        			/>

		        			<p className="mt-2">{name} {lastName}</p>
		        		</div>

		        		<div className="container__options-user mb-3">
		        			<Link to="/mi-perfil">Mi perfil</Link>
		        			<Link to="/">Fotografia</Link>
		        			<Link to="/mis-productos">Mi productos</Link>
		        			<Link to="/crear-producto">Crear productos</Link>
		        			<Link to="/editar-perfil">Editar perfil</Link>
		        			<p>Cerrar sesion</p>
		        		</div>
					</Grid>

					<Grid item xs={12} sm={9} className="py-3">
						<div className="text-center">
							<h3>{title}</h3>
							<p>{text}.</p>
						</div>

						<Divider light />

						<Component />
					</Grid>
				</Grid>
			</ThemeProvider>
		</ControlPanelStyle>
	)
}

export default ControlPanel;