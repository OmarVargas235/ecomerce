import React from 'react';

import { ReactComponent as BtnToggle } from '../../../assets/icons/btn_toggle.svg';
import { ReactComponent as Close } from '../../../assets/icons/close.svg';
import Logo from '../../../assets/img/logo.jpg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import { ReactComponent as Cart } from '../../../assets/icons/cart.svg';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, List, IconButton, Divider } from '@material-ui/core';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.easeOut,
		duration: theme.transitions.duration.enteringScreen,
	}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
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
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.easeOut,
		duration: theme.transitions.duration.enteringScreen,
	}),
	marginLeft: 0,
  },
}));

const DrawerPage = ({ history, activeSearch, category, handleChange, handleClose, handleOpen, isActiveLink, openSelect, setActiveSearch, theme, value }) => {

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
						className={clsx(classes.menuButton, open && classes.hide)}
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
							className="pointer mr-2"
							onClick={() => setActiveSearch(true)}
  							style={{fill: "white"}}
						/>
					</div>

					<div className="container-icon">
						<Cart className="pointer" style={{fill: "white"}} />
					</div>	
				</div>	
			</AppBar>

			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						<Close style={{width: '20px', height: '20px'}} />
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
					<ThemeProvider theme={theme}>
						<FormControl className={`w-100 px-3 ${classes.formControl}`}>
							<InputLabel
								color="secondary"
								id="demo-controlled-open-select-label"
								className="ml-3"
							>Category</InputLabel>

							<Select
								labelId="demo-controlled-open-select-label"
								id="demo-controlled-open-select"
								open={openSelect}
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
				</List>

				<List className="d-flex justify-content-center" dense>
					<ThemeProvider theme={theme}>
						<Paper className={classes.root}>
							<Tabs
								value={isActiveLink ? value : false}
								onChange={handleChange}
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
						</Paper>
					</ThemeProvider>
				</List>
			</Drawer>  
		</div>
	);	
}

export default DrawerPage;