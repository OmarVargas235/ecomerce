import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductPage from './components/ProductPage';
import { getProductActions, getProductsActions } from '../../redux/actions/productActions';
import { styleMaterialUiTheme } from '../../utils/styleMaterialUi';

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

	const classes = useStyles();

	const theme = styleMaterialUiTheme();

	const [idUser, setSidUser] = useState(null);

	useEffect(() => product.user && setSidUser(product.user['_id'] || null), [product]);

	useEffect(() => {
		
		dispatch( getProductActions(id) );
		if (!idUser) return;

		dispatch( getProductsActions(idUser) );

	}, [dispatch, id, idUser]);
	
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