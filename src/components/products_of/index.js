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

	const [orderMessage, setOrderMessage] = useState('por cantidad');
	const [productsLocal, setProductsLocal] = useState([]);

	// Ordener array de productos por: 'cantidad', 'menor precio'
	const sortArr = useCallback((type="") => {

		const productsCopy = [...products];
		productsCopy.sort((a,b) => a[type]-b[type]);

		return productsCopy;

	}, [products]);

	useEffect(() => dispatch( getProductsActions(id) ), [dispatch, id]);
	
	// Ordenar array de productos 'por cantidad'
	useEffect(() => setProductsLocal(sortArr('stock')), [sortArr]);

	const handleChange = (selected) => {

		const [, typeMessage,] = selected.split(' ');

		setOrderMessage(selected);

		if (typeMessage === 'cantidad') setProductsLocal(sortArr('stock'));
		else if (typeMessage === 'menor') setProductsLocal(sortArr('price'));
		else if (typeMessage === 'mayor') setProductsLocal(sortArr('price').reverse());
	}
	
	return (
		<MoreProductsPage
			classes={classes}
			handleChange={handleChange}
			history={history}
			orderMessage={orderMessage}
			products={productsLocal}
		/>
	)
}

export default MoreProducts;