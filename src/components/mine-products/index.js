import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ControlPanel from '../../layaut/ControlPanel';
import MineProductsPage from './MineProductsPage';
import { getProductsActions } from '../../redux/actions/productActions';

const MineProducts = ({ history }) => {
	
	const user = useSelector(state => state.user);
	const loading = useSelector(state => state.product.loading);
	const products = useSelector(state => state.product.products);

	const dispatch = useDispatch();

	useEffect(() => {
		
		const token = user.auth.token;
		const id = user.dataUser.uid;

		dispatch( getProductsActions({ token, id }) );

	}, [dispatch]);
	
	return (
		<ControlPanel
			component={() => <MineProductsPage
				history={history}
				loading={loading}
				products={products}
			/>}
			title="Mis productos"
			text="Revisa todos los productos que has publicado aqui"
		/>
	)
}

export default MineProducts;