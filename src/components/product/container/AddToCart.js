import React, { useState, useEffect, useMemo } from 'react';
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
	const { products } = useSelector(state => state.cart);
	
	const contProduct = products.find(el => el['_id'] === product['_id']);
	
	const history = useHistory();
	const classes = useStyles();
	
	const [turn, setTurn] = useState(false);
	const [changeIconFavorite, setChangeIconFavorite] = useState(false);
	const [getFavorites, setGetFavorites] = useState(false);
	const [isOwner, setIsOwner] = useState(false);
	
	// Comprueba si el producto esta agregado a favoritos
	const isProductFavorite = useMemo(() => productsFavorites.some(el => el.idProduct === product['_id']), [productsFavorites, product]);
	
	// Verificar si el usuario es el dueño del producto
	useEffect(() => {

		if (!product.user) return;
		setIsOwner(dataUser.uid === product.user['_id']);

	}, [product, dataUser]);
	
	// Dispara el dispatch para obtener los productos agregados a favoritos
	useEffect(() => {
		
		if (getFavorites || !auth.isAuthenticated) return;
		
		dispatch( getFavoriteProductActions(dataUser.uid, auth.token) );
		setGetFavorites(true);

	}, [dispatch, dataUser, auth, getFavorites]);
	
	// Actualiza "changeIconFavorite" cada vez que se agrega o elimina un producto de favoritos
	useEffect(() => {
		
		setTimeout(() => setChangeIconFavorite(isProductFavorite), 500);

	}, [productsFavorites, isProductFavorite]);

	const addFavorite = () => {
		
		if (!auth.isAuthenticated) {

			history.push('/iniciar-sesion');
			return;
		}

		const formData = new FormData();
		formData.append('idProduct', product['_id']);
		
		if (!changeIconFavorite) {
			
			dispatch( addFavoriteProductActions(formData, dataUser.uid, auth.token) );
		
		} else {
			
			dispatch( deleteFavoriteProductActions(formData, dataUser.uid, auth.token) );
		}

		setTurn(!turn);
	}

	const addCart = () => {

		auth.isAuthenticated 
		? dispatch( addAction(product, dataUser.uid, auth.token) )
		: history.push('/iniciar-sesion');
	}

	return (
		<AddToCartPage
			addFavorite={addFavorite}
			addCart={addCart}
			classes={classes}
			changeIconFavorite={changeIconFavorite}
			contProduct={contProduct}
			isAuthenticated={auth.isAuthenticated} 
			isOwner={isOwner}
			product={product}
			turn={turn}
		/>
	)
}

export default AddToCart;