import React from 'react';

import Spinner from '../../../layaut/Spinner';
import ProductPage from './ProductPage';

const MineProductsPage = ({ history, loading, products=[] }) => (
	<div className="py-4 px-5 text-center">
		{
			loading ? <Spinner />
			: products.length === 0
				? <div className="mt-5">No tienes ningun producto</div>
				: products.map(product => ( <ProductPage
					key={product.id}
					history={history}
					product={product}
				/> ))
		}
	</div>
)

export default MineProductsPage;