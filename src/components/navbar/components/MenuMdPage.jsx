import React from 'react';

import Logo from '../../../assets/img/logo.jpg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import { ReactComponent as Cart } from '../../../assets/icons/cart.svg';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const MenuMdPage = ({ history, activeSearch, category, classes, handleChange, handleClose, handleOpen, isActiveLink, open, setActiveSearch, theme, value }) => (
	<React.Fragment>
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
				<ThemeProvider theme={theme}>
					<FormControl className={classes.formControl}>
						<InputLabel
							color="secondary"
							id="demo-controlled-open-select-label"
						>Category</InputLabel>

						<Select
							labelId="demo-controlled-open-select-label"
							id="demo-controlled-open-select"
							open={open}
							onClose={handleClose}
							onOpen={handleOpen}
							value={category}
							onChange={handleChange}
							color="secondary"
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>

							<MenuItem value='Juegos PC'>Juegos PC</MenuItem>
							<MenuItem value='Consolas'>Consolas</MenuItem>
							<MenuItem value='Accesorios'>Accesorios</MenuItem>
							<MenuItem value='Juegos consolas'>Juegos consolas</MenuItem>
							<MenuItem value='Componentes'>Componentes</MenuItem>
							<MenuItem value='Decoracion'>Decoracion</MenuItem>
						</Select>
					</FormControl>
				</ThemeProvider>
			</Grid>
			
			<Grid item sm={6}>
				<ThemeProvider theme={theme}>
					<Paper className={classes.root}>
						<Tabs
							value={isActiveLink ? value : false}
							onChange={handleChange}
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
				</ThemeProvider>
			</Grid>

			<Grid item sm={1} className="d-flex justify-content-center align-items-center">
				<div className="container-icon">
					<SearchIcon
						className="pointer mr-2"
						onClick={() => setActiveSearch(true)}
					/>
				</div>

				<div className="container-icon">
					<Cart className="pointer" />
				</div>	
			</Grid>		
		</Grid>
	</React.Fragment>
)

export default MenuMdPage;
