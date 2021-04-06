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

  	const handleChange = (event, newValue) => setValue(newValue);
	
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
			classes={classes}
			handleChange={handleChange}
			isActiveLink={isActiveLink}
			matches={matches}
			setActiveSearch={setActiveSearch}
			theme={theme}
			value={value}
		/>
	)
}

export default withRouter(Navbar);