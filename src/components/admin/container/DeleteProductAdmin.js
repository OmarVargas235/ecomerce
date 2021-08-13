import React, { useCallback, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import SelecterProduct from '../components/SelecterProduct';
import { useSelecter } from '../useSelecter';
import { callAPI } from '../helper';
import { SocketContext } from '../../../context/SocketContext';

const DeleteProductAdmin = () => {

	const { auth:{token}, dataUser } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const { socket } = useContext( SocketContext );

	const history = useHistory();
	
	const [ handleChange, dataSelected, point ] = useSelecter();

	// Eliminar producto del home
	const delateProduct = useCallback((id, data) => {
		
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
			socket,
			dataUser,
			data,
		};

		callAPI(obj);
		
	}, [dispatch, token, history, dataUser, socket]);

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