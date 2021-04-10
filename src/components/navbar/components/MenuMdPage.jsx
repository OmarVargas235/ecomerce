import React from 'react';

import Logo from '../../../assets/img/logo.jpg';
import SearchIcon from '@material-ui/icons/Search';
import { categorys } from '../../../utils/helper';
import SelectionMenu from '../../../layaut/SelectionMenu';
import Cart from '../container/Cart';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';


const MenuMdPage = ({ history, classes, handleChange, isActiveLink, setActiveSearch, value }) => (
	
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
			
			<Grid item sm={6}>
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
			</Grid>

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