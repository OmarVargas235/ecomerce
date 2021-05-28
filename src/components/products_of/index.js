import React, { useEffect } from 'react';
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

const MoreProducts = ({ match }) => {
	
	const dispatch = useDispatch();
	const { products } = useSelector(state => state.product);
	
	const { id } = match.params;

	const classes = useStyles();

	useEffect(() => dispatch( getProductsActions(id) ), [dispatch, id]);
	
	return (
		<MoreProductsPage
			classes={classes}
			products={products}
		/>
	)
}

export default MoreProducts;