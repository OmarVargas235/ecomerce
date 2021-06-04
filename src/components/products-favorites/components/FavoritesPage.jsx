import React from 'react';

import ProductPage from './ProductPage';

const FavoritesPage = ({ delateProduct, history, productsFavorites }) => (
	<React.Fragment>
		{
			productsFavorites.length === 0
			? <div className="text-center mt-5">No hay productos agregados a favoritos</div>
			: productsFavorites.map(product => <ProductPage
				key={product.id}
				delateProduct={delateProduct}
				history={history}
				product={product}
			/>)
		}
	</React.Fragment>
)

export default FavoritesPage;