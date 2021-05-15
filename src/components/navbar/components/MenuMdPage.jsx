import React from 'react';

import Logo from '../../../assets/img/logo.jpg';
import SearchIcon from '@material-ui/icons/Search';
import { categorys } from '../../../utils/helper';
import SelectionMenu from '../../../layaut/SelectionMenu';
import Cart from '../container/Cart';
import PopoverPage from './PopoverPage';

import { Paper, Tabs, Tab, Grid, Typography } from '@material-ui/core';

const MenuMdPage = ({ auth, classes, dataUser, history, isActiveLink, setActiveSearch }) => (
	
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
				!auth.isAuthenticated
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
				: <Grid item sm={6} container alignContent="center" justify="center">

					<div className="pl-3">
						<PopoverPage
							dataUser={dataUser}
							history={history}
						/>
						
						<Typography variant="body1" component="span" className="pointer ml-4">
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

				{
					auth.isAuthenticated
					? <div className="container-icon">
						<Cart />
					</div>
					: null
				}	
			</Grid>		
		</Grid>
	
)

export default MenuMdPage;