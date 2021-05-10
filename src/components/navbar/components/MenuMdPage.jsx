import React from 'react';

import Logo from '../../../assets/img/logo.jpg';
import SearchIcon from '@material-ui/icons/Search';
import { categorys } from '../../../utils/helper';
import SelectionMenu from '../../../layaut/SelectionMenu';
import Cart from '../container/Cart';

import { Paper, Tabs, Tab, Grid, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const MenuMdPage = ({ classes, dataUser, history, isActiveLink, setActiveSearch }) => (
	
		<Grid container>
			<Grid item sm={2} className="text-center">
				<img 
					src={Logo}
					alt="logo"
					className="img-logo"
					onClick={() => history.push('/')}
				/>
			</Grid>

			<Grid item sm={2}>		
				<SelectionMenu
					title="Categorias"
					categorys={categorys}
				/>
			</Grid>
			
			{
				Object.keys(dataUser).length === 0
				? <Grid item sm={6}>
					<Paper className={classes.root}>
						<Tabs
							value={isActiveLink}
							indicatorColor="secondary"
							textColor="primary"
							centered
						>
							<Tab 
								label="Registrarse"
								onClick={() => history.push('/crear-cuenta')}
							/>
							<Tab 
								label="Iniciar sesion"
								onClick={() => history.push('/iniciar-sesion')}
							/>
						</Tabs>
					</Paper>
				</Grid>
				: <Grid item sm={6} container alignContent="center">

					<div className="pl-3">
						<div className="d-inline-block pointer">
							<AccountCircleIcon fontSize="large" />
						
							<Typography variant="body1" component="span" className="ml-2">
								{ dataUser.name } { dataUser.lastName }
							</Typography>
						</div>
						
						<Typography variant="body1" component="span" className="mx-4 pointer">
							cerrar sesion
						</Typography>
						
						<Typography variant="body1" component="span" className="pointer">
							ordenes
						</Typography>
					</div>

				</Grid>
			}

			<Grid item sm={1} className="d-flex justify-content-center align-items-center">
				<div className="container-icon">
					<SearchIcon
						className="pointer mr-2 icon"
						onClick={() => setActiveSearch(true)}
					/>
				</div>

				<div className="container-icon">
					<Cart />
				</div>	
			</Grid>		
		</Grid>
	
)

export default MenuMdPage;