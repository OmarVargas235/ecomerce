import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { styleMaterialUiTheme } from '../utils/styleMaterialUi';
import { Grid, Divider } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export const ControlPanelStyle = styled.section`
	border: 1px solid #DEDFE0;
	background-color: white;

	.divider-horizontal {
		border-right: 1px solid #DEDFE0;
	}

	.icon {
		width: 50px;
		height: 50px;
	}

	.container__options-user {
		p {
			color: #2896A9;
			cursor: pointer;
			padding-top: 5px;
			padding-bottom: 5px;
			padding-left: 20px;
			margin-bottom: 5px;

			&:hover {
				background-color: #8A92A3;
				color: white;
			}
		}
	}

	input {
		border: 1px solid #8A92A3;
		border-radius: 2px;
		padding: 12px;
		padding-left: 14px;

		&:focus {
			border: 1px solid #76C5D6;
		}
	}

	textarea {
		outline: none;

		&:focus {
			border: 1px solid #76C5D6;
		}
	}
`;

const ControlPanel = ({ component:Component, title, text }) => {
	
	const { name, lastName } = useSelector(state => state.user.dataUser);

	const theme = styleMaterialUiTheme();

	return (
		<ControlPanelStyle className="container my-4">
			<ThemeProvider theme={theme}>
				<Grid container>
					<Grid item xs={3} className="divider-horizontal">
		        		<div className="text-center mb-4 mt-3 overflow-hidden">
		        			<AccountCircleIcon
		        				className="icon"
		        				color="secondary"
		        			/>

		        			<p className="mt-2">{name} {lastName}</p>
		        		</div>

		        		<div className="container__options-user mb-3">
		        			<p>Mi perfil</p>
		        			<p>Fotografia</p>
		        			<p>Mis productos</p>
		        			<p>Crear productos</p>
		        			<p>Cerrar sesion</p>
		        		</div>
					</Grid>

					<Grid item xs={9} className="py-3">
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