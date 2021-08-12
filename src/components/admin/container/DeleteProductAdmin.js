import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import SelecterProduct from '../components/SelecterProduct';
import { useSelecter } from '../useSelecter';
import { callAPI } from '../helper';

const DeleteProductAdmin = () => {

	const { auth:{token} } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const history = useHistory();
	
	const [ handleChange, dataSelected, point ] = useSelecter();

	// Eliminar producto del home
	const delateProduct = useCallback(id => {
		
		const obj = {
			id,
			title: 'Esta seguro de eliminar el producto?',
			text: 'Una vez eliminado, no se podra recuperar',
			message: 'Si, eliminar!',
			fireMessage1: 'Eliminado!',
			fireMessage2: 'El producto fue eliminado con exito.',
			url: 'delete-product',
			urlHome: 'delete-product-home',
			token,
			dispatch,
			history,
		};

		callAPI(obj);
		
	}, [dispatch, token, history]);

	return (
		<SelecterProduct
			dataSelected={dataSelected}
			delateProduct={delateProduct}
			handleChange={handleChange}
			message="eliminar producto"
			point={point}
			title="Eliminar producto"
		/>
	)
}

export default DeleteProductAdmin;