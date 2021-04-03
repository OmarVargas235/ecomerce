import React, { useMemo } from 'react';

import ProductPage from './components/ProductPage';
import { items } from '../../utils/dataProducts';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
});

const Product = ({ match }) => {

	const classes = useStyles();
	
	const productMemo = useMemo(() => items.find(product => product.id === match.params.id), [match]);
	
	return (
		<ProductPage
			classes={classes}
			items={items}
			productMemo={productMemo}
		/>
	)
}

export default Product;