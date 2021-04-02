import React, { useMemo } from 'react';

import ProductPage from './components/ProductPage';
import { items } from '../../utils/dataCarrouselHome';

const Product = ({ match }) => {
	
	const productMemo = useMemo(() => items.find(product => product.id === match.params.id), [match]);
	
	return (
		<ProductPage
			items={items}
			productMemo={productMemo}
		/>
	)
}

export default Product;