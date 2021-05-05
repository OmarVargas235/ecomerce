import React, { useState, useMemo } from 'react';
import { withRouter } from 'react-router-dom';

import NavbarPage from './components/NavbarPage';
import { styleMaterialUiTheme } from '../../utils/styleMaterialUi';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		textAlign: 'center',
	},
}));

const Navbar = ({ history }) => {

	// Variables y metodos de material ui
	const matches = useMediaQuery('(min-width:768px)');

	const classes = useStyles();
	
	// Estados del componente
  	const [activeSearch, setActiveSearch] = useState(false);
  	
  	// Detecta cuando esta en '/crear-cuenta' o '/iniciar-sesion' y agrega los estilos correspondientes
  	const isActiveLink = useMemo(() => {
		
		if (history.location.pathname === '/crear-cuenta') return 0;
		else if (history.location.pathname === '/iniciar-sesion') return 1;
		
		return false;

  	}, [history.location]);

  	const [ theme ] = styleMaterialUiTheme();
	
	return (
		<NavbarPage
			history={history}
			activeSearch={activeSearch}
			classes={classes}
			isActiveLink={isActiveLink}
			matches={matches}
			setActiveSearch={setActiveSearch}
			theme={theme}
		/>
	)
}

export default withRouter(Navbar);