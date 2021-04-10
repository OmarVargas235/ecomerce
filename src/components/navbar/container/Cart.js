import React, { useState, useRef } from 'react';

import CartPage from '../components/CartPage';

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

const Cart = () => {

	const cartRef = useRef();

	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [mouseMove, setMouseMove] = useState(-1);

	const handleDrawerOpen = () => setOpen(true);
	const handleDrawerClose = () => setOpen(false);
	
	return (
		<CartPage
			cartRef={cartRef}
			classes={classes}
			handleDrawerOpen={handleDrawerOpen}
			handleDrawerClose={handleDrawerClose}
			mouseMove={mouseMove}
			open={open}
			setOpen={setOpen}
			setMouseMove={setMouseMove}
			theme={theme}
		/>
	)
}

export default Cart;