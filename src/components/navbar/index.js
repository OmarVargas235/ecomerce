import React, { useState, useMemo } from 'react';
import { withRouter } from 'react-router-dom';

import NavbarPage from './components/NavbarPage';

import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		textAlign: 'center',
	},
	formControl: {
		marginBottom: theme.spacing(1),
		minWidth: 120,
	},
}));

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#E12727',
		},
		secondary: {
			main: '#212121',
		},
	},
});

const Navbar = ({ history }) => {

	// Variables y metodos de material ui
	const matches = useMediaQuery('(min-width:768px)');

	const classes = useStyles();
  	const [value, setValue] = useState(0);
	const [category, setCategory] = useState('');
  	const [open, setOpen] = useState(false);

  	const handleChange = (event, newValue) => {
		
  		typeof newValue === 'number' && setValue(newValue);
  		(event.target.value || event.target.value === '') && setCategory(event.target.value);
  	}

  	const handleClose = () => setOpen(false);
  	const handleOpen = () => setOpen(true);
	
	// Estados del del componente
  	const [activeSearch, setActiveSearch] = useState(false);
  	
  	// Detecta cuando esta en '/crear-cuenta' o '/iniciar-sesion' y agrega los estilos correspondientes
  	const isActiveLink = useMemo(() => (
		history.location.pathname === '/crear-cuenta'
		|| history.location.pathname === '/iniciar-sesion'
  	), [history.location]);
	
	return (
		<NavbarPage
			history={history}
			activeSearch={activeSearch}
			category={category}
			classes={classes}
			handleChange={handleChange}
			handleClose={handleClose}
			handleOpen={handleOpen}
			isActiveLink={isActiveLink}
			matches={matches}
			open={open}
			setActiveSearch={setActiveSearch}
			theme={theme}
			value={value}
		/>
	)
}

export default withRouter(Navbar);