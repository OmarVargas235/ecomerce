import React from 'react';

import { ReactComponent as BtnToggle } from '../../../assets/icons/btn_toggle.svg';
import CloseIcon from '@material-ui/icons/Close';
import Logo from '../../../assets/img/logo.jpg';
import SearchIcon from '@material-ui/icons/Search';
import SelectedCategory from '../container/SelectedCategory';
import Cart from '../container/Cart';
import PopoverPage from './PopoverPage';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, List, IconButton, Divider } from '@material-ui/core';
import { Paper, Tabs, Tab } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
}));

const DrawerPage = ({ auth, contNewMessage, dataUser, history, isActiveLink, setActiveSearch }) => {

	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => setOpen(true);

	const handleDrawerClose = () => setOpen(false);

  	return (
		<div className={`mb-5 ${classes.root}`}>
			<AppBar
				position="fixed"
				className="flex-row justify-content-between p-2"
			>
				<Toolbar className="px-0 px-sm-3">
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
					>
						<BtnToggle style={{width: '40px', height: '40px', fill: "white"}} />
					</IconButton>
				</Toolbar>

				<img 
					src={Logo}
					alt="logo"
					className="img-logo"
					style={{width: '80px', height: '80px', borderRadius: '50%'}}
				/>

				<div 
					className="d-flex justify-content-center align-items-center mr-4 mr-sm-5"
				>
					<div className="container-icon">
						<SearchIcon
							className="pointer mr-2 icon"
							onClick={() => setActiveSearch(true)}
  							style={{fill: "white"}}
						/>
					</div>

					{
						auth.isAuthenticated
						? <div className="container-icon">
							<Cart />
						</div>
						: null
					}	
				</div>	
			</AppBar>

			<Drawer
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						<CloseIcon className="icon" />
					</IconButton>
				</div>

				<Divider />

				<List className="text-center">
					<img 
						src={Logo}
						alt="logo"
						className="img-logo"
						style={{width: '90px', height: '90px'}}
						onClick={() => history.push('/')}
					/>
				</List>

				<Divider />

				<List>
					<SelectedCategory />
				</List>

				<List className="d-flex justify-content-center" dense>
					<Paper className={classes.root}>
						{
							!auth.isAuthenticated
							? <Tabs
								value={isActiveLink}
								indicatorColor="secondary"
								textColor="primary"
								orientation="vertical"
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
							: <Tabs
								value={isActiveLink}
								indicatorColor="secondary"
								textColor="primary"
								orientation="vertical"
							>
								<PopoverPage
									contNewMessage={contNewMessage}
									dataUser={dataUser}
									history={history}
								/>

								<Tab 
									label="Ordenes"
									// onClick={() => history.push('/iniciar-sesion')}
								/>
								<Tab 
									label="Cerrar sesion"
									// onClick={() => history.push('/iniciar-sesion')}
								/>
							</Tabs>
						}
					</Paper>
				</List>
			</Drawer>  
		</div>
	);	
}

export default DrawerPage;