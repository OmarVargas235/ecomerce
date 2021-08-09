import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import { requestWithToken, requestWithoutToken } from '../../../utils/fetch';
import { alert } from '../../../utils/alert';
import { logoutUser } from '../../../redux/actions/userAction';
import CardAdminPage from '../components/CardAdminPage';

const CardAdmin = ({ addOrDeleteProduct=()=>{}, isAdd=false, message="", product, point }) => {

	const { auth:{token} } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const history = useHistory();

	const delateProduct = useCallback(id => {
		
		Swal.fire({
			title: 'Esta seguro de eliminar el producto?',
			text: 'Una vez eliminado, no se podra recuperar',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#212121',
			cancelButtonColor: '#E12727',
			confirmButtonText: 'Si, eliminar!'
		}).then(async (result) => {
			
			if (result.isConfirmed) {
				Swal.fire(
					'Eliminado!',
					'El producto fue eliminado con exito.',
					'success'
				);
				
				const formData = new FormData();
				formData.append('id', id);

				const { ok, messages, isExpiredToken } = await requestWithToken('delete-product', token, formData, 'DELETE');

				if (isExpiredToken) {
					
					dispatch( logoutUser() );
					alert('error', messages);

					return;
				}

				if (!ok) return alert('error', messages);

				await requestWithoutToken('delete-product-home', {id}, 'DELETE');
				history.push('/admin');
			}
		});
		
	}, [dispatch, token, history]);

	const handleClick = () => {
		
		const id = product['_id'];
		
		message === 'editar producto'
		? history.push(`/editar-producto/${id}`)
		: delateProduct(id);
	}
	
	return (
		<CardAdminPage
			addOrDeleteProduct={addOrDeleteProduct}
			handleClick={handleClick}
			isAdd={isAdd}
			message={message}
			product={product}
			point={point}
		/>
	)
}

export default CardAdmin;