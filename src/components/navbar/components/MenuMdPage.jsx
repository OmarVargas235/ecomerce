import React from 'react';

import Logo from '../../../assets/img/logo.jpg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import { ReactComponent as Cart } from '../../../assets/icons/cart.svg';
import SelectionMenu from '../../../layaut/SelectionMenu';
import { categorys } from '../../../utils/helper';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/styles';

const MenuMdPage = ({ history, activeSearch, classes, handleChange, isActiveLink, setActiveSearch, theme, value }) => (
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
					<SelectionMenu
						title="Categorias"
						theme={theme}
						categorys={categorys}
					/>
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