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
		
	const dispatch = useDispatch();
	const { product, products } = useSelector(state => state.product);
	const { auth, dataUser } = useSelector(state => state.user);

	const classes = useStyles();
	const theme = styleMaterialUiTheme();

	const { params:{id}, url } = match;

	const { socket, online } = useContext( SocketContext );

	const [idUser, setSidUser] = useState(null);
	
	// Obtener el id del usuario, si este existe.
	useEffect(() => product.user && setSidUser(product.user['_id'] || null), [product]);

	useEffect(() => {
		
		dispatch( getProductActions(id) );
		if (!idUser) return;

		dispatch( getProductsActions(idUser) );

	}, [dispatch, id, idUser]);
	
	// Actualiza las coordenadas en tiempo real y conectar el usuario a una sala.
	useEffect(() => {
		
		if (online) socket.on('get-coordinates', resp => dispatch( getProduct(resp) ));
		if (online && product['_id']) socket.emit('join-chat-room', product['_id']);

		return () => {

			socket.off('get-coordinates');
			socket.off('join-chat-room');
		}
		
	}, [socket, online, dispatch, product]);
	
	return (
		<ProductPage
			auth={auth}
			classes={classes}
			dataUser={dataUser}
			product={product}
			products={products}
			theme={theme}
			url={url}
		/>
	)
}

export default Product;