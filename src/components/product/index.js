import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductPage from './components/ProductPage';
import {
	getProductActions,
	getProductsActions,
	getProduct, 
} from '../../redux/actions/productActions';
import { styleMaterialUiTheme } from '../../utils/styleMaterialUi';
import { SocketContext } from '../../context/SocketContext';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	card: {
		minHeight: 275,
	},
});

const Product = ({ match }) => {
	
	const { id } = match.params;
	
	const dispatch = useDispatch();
	const { product, products } = useSelector(state => state.product);
	const { auth, dataUser } = useSelector(state => state.user);

	const { socket, online } = useContext( SocketContext );

	const classes = useStyles();

	const theme = styleMaterialUiTheme();

	const [idUser, setSidUser] = useState(null);

	useEffect(() => product.user && setSidUser(product.user['_id'] || null), [product]);

	useEffect(() => {
		
		dispatch( getProductActions(id) );
		if (!idUser) return;

		dispatch( getProductsActions(idUser) );

	}, [dispatch, id, idUser]);

	useEffect(() => {
		
		if (online) socket.on('get-coordinates', resp => dispatch(getProduct(resp) ) );
		
	}, [socket, online, dispatch]);
	
	return (
		<ProductPage
			auth={auth}
			classes={classes}
			dataUser={dataUser}
			product={product}
			products={products}
			theme={theme}
		/>
	)
}

export default Product;