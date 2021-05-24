import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ControlPanel from '../../layaut/ControlPanel';
import MineProductsPage from './components/MineProductsPage';
import { getProductsActions } from '../../redux/actions/productActions';
import { requestWithToken } from '../../utils/fetch';
import { alert } from '../../utils/alert';

const MineProducts = ({ history }) => {
	
	const user = useSelector(state => state.user);
	const loading = useSelector(state => state.product.loading);
	const products = useSelector(state => state.product.products);

	const dispatch = useDispatch();

	useEffect(() => {
		
		const token = user.auth.token;
		const id = user.dataUser.uid;

		dispatch( getProductsActions({ token, id }) );

	}, [dispatch, user]);

	const delateProduct = async id => {
		
		const idUser = user.dataUser.uid;
		const formData = new FormData();
		formData.append('id', id);

		const token = user.auth.token;

		const { ok, messages } = await requestWithToken('delete-product', token, formData, 'DELETE');

		alert(ok ? 'success' : 'error', messages);
		dispatch( getProductsActions({ token, id: idUser }) );
	}
	
	return (
		<ControlPanel
			component={() => <MineProductsPage
				delateProduct={delateProduct}
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