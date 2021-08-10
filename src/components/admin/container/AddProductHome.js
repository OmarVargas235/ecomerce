import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SelecterProduct from '../components/SelecterProduct';
import { useFetch } from '../../../customHooks/useFetch';
import { addProductAction, deleteProductAction } from '../../../redux/actions/homeAction';
import { logoutUser } from '../../../redux/actions/userAction';
import { requestWithToken } from '../../../utils/fetch';
import { alert } from '../../../utils/alert';
import { useSelecter } from '../useSelecter';

import Container from '@material-ui/core/Container';

const AddProductHome = () => {
	
	const { products } = useSelector(state => state.productsHome);
	const { auth:{token} } = useSelector(state => state.user);
	const dispatch = useDispatch();
	
	const { data:dataProductsHome } = useFetch('get-products-home');
	const [ handleChange, dataSelected, point ] = useSelecter();

	// Actualizar el store de redux con los productos agregados al home cada vez que se recarga la pagina
	useEffect(() => {
		
		if (!dataProductsHome) return;
		dispatch( addProductAction(dataProductsHome.map(product => product)) );
		
	}, [dataProductsHome, dispatch]);
	
	// Agregar o eliminar un producto del home
	const addOrDeleteProduct = async text => {

		if (products.length + 1 > 9 && text === 'Agregar al home') 
			return alert('warning', ['Solo puedes agregar un maximo de 9 productos al home']);
		
		const isExists = products.some(el => el['_id'] === dataSelected['_id']);
		
		// Agregar o eliminar del store de redux
		text === 'Agregar al home'
		? dispatch( addProductAction(isExists ? products : [...products, dataSelected]) )
		: dispatch( deleteProductAction(dataSelected) );
		
		// Guardar el producto agregado o eliminado en el backend
		const formData = new FormData();
		formData.append('product', window.JSON.stringify(dataSelected));
		formData.append('isExists', isExists);
		formData.append('text', text);

		const resp = await requestWithToken('products-home', token, formData, 'POST');
		const { ok, messages, isExpiredToken, isExistsBD } = resp;
		
		// Si el token ya a expirado se deslogea
		if (isExpiredToken) {
			
			dispatch( logoutUser() );
			alert('error', messages);
			
			return;
		}

		if (!ok) return alert('error', messages);
		if (isExistsBD) return alert('warning', messages);

		alert('success', messages);
	}
	
	return (
		<Container maxWidth="sm" className="my-5">
			<SelecterProduct
				addOrDeleteProduct={addOrDeleteProduct}
				dataSelected={dataSelected}
				handleChange={handleChange}
				isAdd={true}
				point={point}
				title="Agregar producto al home"
			/>
		</Container>
	)
}

export default AddProductHome;