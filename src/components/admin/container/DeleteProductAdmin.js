import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

import SelecterProduct from '../components/SelecterProduct';
import { useSelecterProduct } from '../useSelecterProduct';
import { logoutUser } from '../../../redux/actions/userAction';
import { requestWithToken, requestWithoutToken } from '../../../utils/fetch';
import { alert } from '../../../utils/alert';

import Container from '@material-ui/core/Container';

const DeleteProductAdmin = () => {

	const { auth:{token} } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const history = useHistory();
	
	const [ handleChange, product, point ] = useSelecterProduct();

	// Eliminar producto del home
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

	return (
		<Container maxWidth="sm" className="my-5">
			<SelecterProduct
				delateProduct={delateProduct}
				handleChange={handleChange}
				message="eliminar producto"
				product={product}
				point={point}
			/>
		</Container>
	)
}

export default DeleteProductAdmin;