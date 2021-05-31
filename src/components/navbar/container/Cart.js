import React, { useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CartPage from '../components/CartPage';
import { styleMaterialUiTheme } from '../../../utils/styleMaterialUi';
import { addAction, deleteAction, clearAction } from '../../../redux/actions/cartAction';

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
	const products = useSelector(state => state.cart.products);

	const getLS = useMemo(() => JSON.parse(window.localStorage.getItem(`cart-${idUser}`)) || [], [idUser]);

	const cartRef = useRef();

	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [mouseMove, setMouseMove] = useState(-1);

	const totalToPay =  useMemo(() => (

		products.reduce((acc, product) => {

			acc += product.cont * parseFloat(product.price);
			return acc;
		}, 0)

	), [products]);

	const handleDrawerOpen = () => setOpen(true);
	const handleDrawerClose = () => setOpen(false);

	const themeColour = styleMaterialUiTheme();

	const plusOrLess = (product, type="plus") => {

		product.cont = type === 'less' ? product.cont - 1 : product.cont + 1;
		const cont = product.cont;

		dispatch( addAction(product, idUser, type === 'less') );
		
		if (cont < 1) dispatch( deleteAction(product, idUser) );
	}

	const deleteProduct = product => dispatch( deleteAction(product, idUser) );

	const buyProduct = () => dispatch( clearAction(idUser) );
	
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
			products={products.length === 0 ? getLS : products}
			plusOrLess={plusOrLess}
			setMouseMove={setMouseMove}
			theme={theme}
			themeColour={themeColour}
			totalToPay={totalToPay}
		/>
	)
}

export default Cart;