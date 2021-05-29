import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AddToCartPage from '../components/AddToCartPage';
import { addAction } from '../../../redux/actions/cartAction';
import { addFavoriteProductActions,
	deleteFavoriteProductActions,
	getFavoriteProductActions,
} from '../../../redux/actions/userAction';

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
	const { auth, dataUser, productsFavorites } = useSelector(state => state.user);

	const history = useHistory();
	const classes = useStyles();

	const [turn, setTurn] = useState(false);
	const [changeIconFavorite, setChangeIconFavorite] = useState(false);
	const [getFavorites, setGetFavorites] = useState(false);

	useEffect(() => {
		
		if (getFavorites) return;

		dispatch( getFavoriteProductActions(dataUser.uid, auth.token) );

		const isProductFavorite = productsFavorites.find(el => el.idProduct === product.id);
		const stateFavorite = isProductFavorite ? isProductFavorite.state : false;
		
		setChangeIconFavorite(stateFavorite);

		setGetFavorites(true);

	}, [dispatch, dataUser, auth, product, productsFavorites, getFavorites]);

	useEffect(() => {
		
		const isProductFavorite = productsFavorites.find(el => el.idProduct === product.id);
		const stateFavorite = isProductFavorite ? isProductFavorite.state : false;
		
		setTimeout(() => setChangeIconFavorite(stateFavorite), 500);

	}, [productsFavorites, product]);

	const addFavorite = () => {
		
		if (!auth.isAuthenticated) {

			history.push('/iniciar-sesion');
			return;
		}

		const formData = new FormData();
		formData.append('idProduct', product.id);

		if (!changeIconFavorite) {
			
			formData.append('state', true);
			dispatch( addFavoriteProductActions(formData, dataUser.uid, auth.token) );
		
		} else {
			
			dispatch( deleteFavoriteProductActions(formData, dataUser.uid, auth.token) );
		}

		setTurn(!turn);
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
			product={product}
			turn={turn}
		/>
	)
}

export default AddToCart;