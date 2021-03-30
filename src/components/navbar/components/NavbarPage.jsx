import React from 'react';

import { NavbarContainer } from '../style';
import Search from '../container/Search';
import Logo from '../../../assets/img/logo.jpg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import { ReactComponent as Cart } from '../../../assets/icons/cart.svg';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/styles';

const NavbarPage = ({ activeSearch, classes, handleChange, setActiveSearch, theme, value }) => (
	<NavbarContainer className="p-3">
		<Grid container>
			<Grid item xs={2} className="text-center">
				<img src={Logo} alt="logo" className="img-logo" />
			</Grid>
			
			<Grid item xs={8}>
				<ThemeProvider theme={theme}>
					<Paper className={classes.root}>
						<Tabs
							value={value}
							onChange={handleChange}
							indicatorColor="secondary"
							textColor="primary"
							centered
						>
							<Tab label="Categorias" />
							<Tab label="Registrarse" />
							<Tab label="Iniciar sesion" />
						</Tabs>
					</Paper>
				</ThemeProvider>
			</Grid>

			<Grid item xs={2} className="d-flex justify-content-center align-items-center">
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

		{ activeSearch ? <Search setActiveSearch={setActiveSearch} /> : null }
	</NavbarContainer>
)

export default NavbarPage;