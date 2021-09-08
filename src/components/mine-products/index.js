import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import ControlPanel from '../../layaut/ControlPanel';
import MineProductsPage from './components/MineProductsPage';
import { getProductsActions } from '../../redux/actions/productActions';
import { requestWithToken } from '../../utils/fetch';
import { alert } from '../../utils/alert';
import { logoutUser } from '../../redux/actions/userAction';

const MineProducts = ({ history }) => {
	
	const user = useSelector(state => state.user);
	const { loading, products } = useSelector(state => state.product);
	const dispatch = useDispatch();

	useEffect(() => {

		if ( Object.values(user.dataUser).length === 0 ) return;

		const id = user.dataUser.uid;

		dispatch( getProductsActions(id) );

	}, [dispatch, user]);
	
	const delateProduct = async id => {

		const productsDelete = products.find(product => product['_id'] === id);

		if (productsDelete.images.length === 0) return alert('error', ['Espera a que se cargen las imagenes']);

		await Swal.fire({
			title: 'Esta seguro de eliminar el producto?',
			text: 'Una vez eliminado, no se podra recuperar',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#212121',
			cancelButtonColor: '#E12727',
			confirmButtonText: 'Si, eliminar!',
		}).then(async (result) => {

			if (result.isConfirmed) {

				Swal.fire(
					'Eliminado',
					'Producto eliminado con exito',
					'success'
				);

				const idUser = user.dataUser.uid;
				const formData = new FormData();
				formData.append('id', id);

				const token = user.auth.token;

				const { ok, messages, isExpiredToken } = await requestWithToken('delete-product', token, formData, 'DELETE');

				if (isExpiredToken) {
					
					dispatch( logoutUser() );
					alert('error', messages);

					return;
				}
				
				alert(ok ? 'success' : 'error', messages);
				
				dispatch( getProductsActions(idUser) );
			}
		});	
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