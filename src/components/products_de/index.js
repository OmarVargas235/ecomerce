import React from 'react';
import MoreProductsPage from './components/MoreProductsPage'; 

import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles({
// 	root: {
//     	flexGrow: 1,
//     	width: '100%'
//   	},
// 	card: {
// 		minHeight: 275,
// 	},
// 	heading: {
// 		fontSize: theme.typography.pxToRem(15),
// 		fontWeight: theme.typography.fontWeightRegular,
// 	},
// });

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

const MoreProducts = () => {

	const classes = useStyles();
	
	return (
		<MoreProductsPage
			classes={classes}
		/>
	)
}

export default MoreProducts;