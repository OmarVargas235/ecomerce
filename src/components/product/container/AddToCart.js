import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AddToCartPage from '../components/AddToCartPage';
import { addAction } from '../../../redux/actions/cartAction';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	containerFavorite: {
		perspective: '1000px',
		transformStyle: 'preserve-3d',
	},
	favorite: {
		transform: 'rotateY(0)',
		transition: 'transform .5s ease-in-out',
	},
	favoriteTurn: {
		transform: 'rotateY(360deg)',
		transition: 'transform .5s ease-in-out',
	},
});

const AddToCart = ({ product }) => {
	
	const dispatch = useDispatch();
	const auth = useSelector(state => state.user.auth);

	const history = useHistory();
	const classes = useStyles();

	const [turn, setTurn] = useState(false);
	const [changeIconFavorite, setChangeIconFavorite] = useState(false);

	const addFavorite = () => {
		
		if (!auth.isAuthenticated) {

			history.push('/iniciar-sesion');
			return;
		}

		setTurn(!turn);

		// Cuando termine la animacion de girar cambia de icono
		setTimeout(() => setChangeIconFavorite(!changeIconFavorite), 500);
	}

	const addCart = () => {

		auth.isAuthenticated 
		? dispatch( addAction(product) ) : history.push('/iniciar-sesion');
	}
	
	return (
		<AddToCartPage
			addFavorite={addFavorite}
			addCart={addCart}
			classes={classes}
			changeIconFavorite={changeIconFavorite}
			turn={turn}
		/>
	)
}

export default AddToCart;