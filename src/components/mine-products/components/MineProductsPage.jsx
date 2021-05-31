import React from 'react';

import Spinner from '../../../layaut/Spinner';
import ProductPage from './ProductPage';
import { MineProductsStyles } from '../style.js';

const MineProductsPage = ({ delateProduct, history, loading, products=[] }) => (
	<MineProductsStyles className="py-4 px-5 text-center">
		{
			loading ? <Spinner />
			: products.length === 0
				? <div className="mt-5">No tienes ningun producto</div>
				: products.map(product => ( <ProductPage
					key={product.id}
					delateProduct={delateProduct}
					history={history}
					product={product}
				/> ))
		}
	</MineProductsStyles>
)

export default MineProductsPage;