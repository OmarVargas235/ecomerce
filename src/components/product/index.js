import React, { useMemo } from 'react';

import ProductPage from './components/ProductPage';
import { items } from '../../utils/dataProducts';

import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	card: {
		minHeight: 275,
	}
});

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#E12727',
		},
		secondary: {
			main: '#212121',
		},
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
			theme={theme}
		/>
	)
}

export default Product;