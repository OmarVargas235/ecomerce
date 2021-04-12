import React, { useState, useRef } from 'react';

import CartPage from '../components/CartPage';
import { styleMaterialUiTheme } from '../../../utils/styleMaterialUi';

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

	const [ themeColour ] = styleMaterialUiTheme();
	
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
			themeColour={themeColour}
		/>
	)
}

export default Cart;