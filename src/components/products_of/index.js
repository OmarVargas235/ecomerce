import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MoreProductsPage from './components/MoreProductsPage';
import { getProductsActions } from '../../redux/actions/productActions';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
    	flexGrow: 1,
    	width: '100%'
  	},
	card: {
		minHeight: 275,
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
}));

const MoreProducts = ({ history, match }) => {
	
	const dispatch = useDispatch();
	const { products } = useSelector(state => state.product);
	
	const classes = useStyles();

	const { id } = match.params;

	const [order, setOrder] = useState('por cantidad');

	// const sortArr = (type="") => products.sort((a,b) => a[type] - b[type]);
	const sortArr = useCallback((type="") => products.sort((a,b) => a[type]-b[type]),[products]);

	useEffect(() => dispatch( getProductsActions(id) ), [dispatch, id]);
	
	useEffect(() => sortArr('stock'), [sortArr]);

	const handleChange = (selected) => {

		const [, typeMessage,] = selected.split(' ');

		setOrder(selected);

		if (typeMessage === 'cantidad') sortArr('stock');
		else if (typeMessage === 'menor') sortArr('price');
		else if (typeMessage === 'mayor') products.sort((a,b) => b.price - a.price);
	}
	
	return (
		<MoreProductsPage
			classes={classes}
			handleChange={handleChange}
			history={history}
			order={order}
			products={products}
		/>
	)
}

export default MoreProducts;