import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { styleMaterialUiTheme } from '../utils/styleMaterialUi';
import { ControlPanelStyle } from './style';
import { TealButton } from '../utils/styleMaterialUi';
import { signOff } from '../utils/helper';

import { Grid, Divider } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const ControlPanel = ({ component:Component, history, title, text, textButton, desactiveBtn=false, photograph=false, handleClick }) => {
	
	const { dataUser } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const { name, lastName, img } = dataUser;

	const theme = styleMaterialUiTheme();

	return (
		<ControlPanelStyle className="px-4 px-md-3 container-md my-4">
			<ThemeProvider theme={theme}>
				<Grid container className="box">
					<Grid item xs={12} sm={3} className="divider-horizontal">
		        		<div className="text-left text-sm-center pl-4 pl-sm-0 mb-4 mt-3 overflow-hidden">
		        			{
		        				!img 
		        				? <AccountCircleIcon className="icon" color="secondary" />
		        				: <img className="img-user" src={`${process.env.REACT_APP_BACKEND_URL}/${img}`} alt="img" />
		        			}

		        			<p className="mt-2">{name} {lastName}</p>
		        		</div>

		        		<div className="container__options-user mb-3">
		        			<Link to="/mi-perfil">Mi perfil</Link>
		        			<Link to="/fotografia">Fotografia</Link>
		        			<Link to="/favoritos">Favoritos</Link>
		        			<Link to="/mis-productos">Mis productos</Link>
		        			<Link to="/ubicacion-producto">Agregar ubicacion</Link>
		        			<Link to="/conectados">Conectados</Link>
		        			<p onClick={() => signOff(dataUser, dispatch)}>Cerrar sesion</p>
		        		</div>
					</Grid>

					<Grid item xs={12} sm={9} className="py-3">
						<div className="text-center">
							<h3>{title}</h3>
							<p>{text}.</p>
						</div>

						<Divider light />

						<Component />

						{
							!textButton
							? null
							: <React.Fragment>
								<Divider light />

								<div className={`mt-3 btn px-4 mr-5 text-${photograph ? 'center' : 'right'}`}>
									<TealButton
										variant="contained"
										type="submit"
										disabled={desactiveBtn}
										onClick={handleClick}
									>{textButton}</TealButton>
								</div>
							</React.Fragment>
						}
					</Grid>
				</Grid>
			</ThemeProvider>
		</ControlPanelStyle>
	)
}

export default ControlPanel;