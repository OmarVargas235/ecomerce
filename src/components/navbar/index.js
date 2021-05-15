import React, { useState, useEffect, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { styleMaterialUiTheme } from '../../utils/styleMaterialUi';

import { getUserAction, loginAction } from '../../redux/actions/userAction';
import NavbarPage from './components/NavbarPage';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));

const Navbar = ({ history }) => {
	
	// Variables y metodos de material ui
	const matches = useMediaQuery('(min-width:768px)');
	const classes = useStyles();

	// Redux
	const dispatch = useDispatch();
	const getUserRedux = useSelector(state => state.user.dataUser);
	const auth = useSelector(state => state.user.auth);

	const [ theme ] = styleMaterialUiTheme();
	
	// Estados del componente
  	const [activeSearch, setActiveSearch] = useState(false);

  	useEffect(() => {

  		const getToken = window.localStorage.getItem('token') || '';

  		dispatch( getUserAction() );
  		getToken && dispatch( loginAction(getToken) );

  	}, [dispatch]);
  	
  	// Detecta cuando esta en '/crear-cuenta' o '/iniciar-sesion' y agrega los estilos correspondientes
  	const isActiveLink = useMemo(() => {
		
		if (history.location.pathname === '/crear-cuenta') return 0;
		else if (history.location.pathname === '/iniciar-sesion') return 1;
		
		return false;

  	}, [history.location]);
	
	return (
		<NavbarPage
			auth={auth}
			activeSearch={activeSearch}
			classes={classes}
			dataUser={getUserRedux}
			history={history}
			isActiveLink={isActiveLink}
			matches={matches}
			setActiveSearch={setActiveSearch}
			theme={theme}
		/>
	)
}

export default withRouter(Navbar);