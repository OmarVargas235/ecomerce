import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CartPage from '../components/CartPage';
import { styleMaterialUiTheme } from '../../../utils/styleMaterialUi';
import { createNotifications } from '../../../utils/helper';
import { addAction, add, deleteAction, clearAction } from '../../../redux/actions/cartAction';
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

	const { socket } = useContext( SocketContext );
	
	const classes = useStyles();
	const theme = useTheme();
	const themeColour = styleMaterialUiTheme();

	const cartRef = useRef();

	const [open, setOpen] = useState(false);
	const [mouseMove, setMouseMove] = useState(-1);

	const totalToPay = useMemo(() => (

		products.reduce((acc, product) => {

			acc += product.cont * parseFloat(product.price);
			return acc;
		}, 0)

	), [products]);

	useEffect(() => {
		
		const getLS = JSON.parse(window.localStorage.getItem(`cart-${idUser}`)) || [];

		dispatch( add(getLS) );

	}, [dispatch, idUser]);

	const handleDrawerOpen = () => setOpen(true);
	const handleDrawerClose = () => setOpen(false);

	const plusOrLess = (product, type="plus") => {

		product.cont = type === 'less' ? product.cont - 1 : product.cont + 1;
		const cont = product.cont;

		dispatch( addAction(product, idUser, token, type === 'less') );
		
		if (cont < 1) dispatch( deleteAction(product, idUser) );
	}

	const deleteProduct = product => dispatch( deleteAction(product, idUser, token) );

	const buyProduct = () => {
		
		if (products.length > 0) {
			
			const message = 'Realizado una compra de tu producto';
			createNotifications(dataUser, products[0], socket, message);
		}

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