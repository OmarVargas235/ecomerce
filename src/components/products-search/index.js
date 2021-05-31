import React from 'react';
import { useSelector } from 'react-redux';

import ProductsSearchPage from './ProductsSearchPage';

const ProductsSearch = ({ history }) => {

	const products = useSelector(state => state.product.productsSearch);
	
	return (
		<ProductsSearchPage
			history={history}
			products={products}
		/>
	)
}

export default ProductsSearch;