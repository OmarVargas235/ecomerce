import React from 'react';

import OrdersPage from './OrdersPage';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
});

const Orders = () => {

	const classes = useStyles();
	
	return (
		<OrdersPage
			classes={classes}
		/>
	)
}

export default Orders;