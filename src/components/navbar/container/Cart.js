import React, { useState, useEffect, useRef, useMemo, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";

import CartPage from '../components/CartPage';
import { styleMaterialUiTheme } from '../../../utils/styleMaterialUi';
import { alert } from '../../../utils/alert';
import { createNotifications } from '../../../utils/helper';
import { requestWithToken, requestWithoutToken } from '../../../utils/fetch';
import { addAction, add, deleteAction, clearAction } from '../../../redux/actions/cartAction';
import { getProduct } from '../../../redux/actions/productActions';
import { SocketContext } from '../../../context/SocketContext';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 330;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	drawerPaper: {
		width: drawerWidth,
	},
}));

const Cart = ({ idUser }) => {
	
	const dispatch = useDispatch();
	const { dataUser } = useSelector(state => state.user);
	const products = useSelector(state => state.cart.products);
	const token = useSelector(state => state.user.auth.token);

	const { pathname } = useLocation();
	
	const classes = useStyles();
	const theme = useTheme();
	const themeColour = styleMaterialUiTheme();

	const { socket } = useContext( SocketContext );

	const cartRef = useRef();

	const [open, setOpen] = useState(false);
	const [mouseMove, setMouseMove] = useState(-1);

	const totalToPay = useMemo(() => (

		products.reduce((acc, product) => {

			acc += product.cont * parseFloat(product.price);
			return acc;
		}, 0)

	), [products]);

	// Comprobar si hay stock del producto
	const isStock = useCallback(async (productsArr) => {

		for(let i = 0; i < products.length; i++) {

			const product = products[i];
			const resp1 = await requestWithoutToken(`get-product/${product['_id']}`);
			const { ok, messages } = await resp1.json();

			const message = `${messages.name} (producto) agotado, agrega mas o eliminalo`;
			const diff = messages.stock - productsArr[i].cont;

			if (!ok) return alert('error', messages);
			
			diff === 0 && createNotifications(dataUser, messages, socket, message, product.url);

			if (messages.stock === 0 || productsArr[i].cont > messages.stock)
				alert('error', [`Stock insuficiente de ${messages.name}`]);

			if (messages.stock === 0 || productsArr[i].cont > messages.stock) return false;
		}

		return true;

	}, [products, dataUser, socket]);

	useEffect(() => {
		
		const getLS = JSON.parse(window.localStorage.getItem(`cart-${idUser}`)) || [];

		dispatch( add(getLS) );

		socket.on('get-stock-product', resp => {

			const arrPath = pathname.split('/');
			const id = arrPath[arrPath.length - 1];
			const productFind = resp.find(product => product['_id'] === id);
			productFind && dispatch( getProduct(productFind) );
		});

	}, [dispatch, idUser, socket, pathname]);

	const handleDrawerOpen = () => setOpen(true);
	const handleDrawerClose = () => setOpen(false);

	const plusOrLess = async (product, type="plus") => {
		
		const exists = await isStock(products);
		if (!exists) return;

		product.cont = type === 'less' ? product.cont - 1 : product.cont + 1;
		const cont = product.cont;

		dispatch( addAction(product, idUser, token, type === 'less') );
		
		if (cont < 1) dispatch( deleteAction(product, idUser) );
	}

	const deleteProduct = product => dispatch( deleteAction(product, idUser, token) );

	const buyProduct = async () => {

		if (products.length === 0) return;

		const exists = await isStock(products);
		if (!exists) return;

		if (products.length > 0) {
			
			const message = 'Realizado una compra de tu producto';
			createNotifications(dataUser, products[0], socket, message);
		}

		const formData = new FormData();
		formData.append('products', JSON.stringify(products));

		const resp = await requestWithToken('buy-product', token, formData, 'POST');
		const { ok, messages, isExpiredToken } = resp;

		if (isExpiredToken) return alert('error', messages);
		if (!ok) return alert('error', messages);

		socket.emit('stock-product', messages);
		dispatch( clearAction(idUser, token) );
	}
	
	return (
		<CartPage
			buyProduct={buyProduct}
			cartRef={cartRef}
			classes={classes}
			deleteProduct={deleteProduct}
			handleDrawerOpen={handleDrawerOpen}
			handleDrawerClose={handleDrawerClose}
			mouseMove={mouseMove}
			open={open}
			products={products}
			plusOrLess={plusOrLess}
			setMouseMove={setMouseMove}
			theme={theme}
			themeColour={themeColour}
			totalToPay={totalToPay}
		/>
	)
}

export default Cart;