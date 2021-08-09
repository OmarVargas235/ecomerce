import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';

import AddProductHomePage from '../components/AddProductHomePage';
import { useFetch } from '../../../customHooks/useFetch';
import { styleMaterialUiTheme } from '../../../utils/styleMaterialUi';
import { addProductAction, deleteProductAction } from '../../../redux/actions/homeAction';
import { logoutUser } from '../../../redux/actions/userAction';
import { requestWithToken } from '../../../utils/fetch';
import { alert } from '../../../utils/alert';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const AddProductHome = () => {
	
	const { products } = useSelector(state => state.productsHome);
	const { auth:{token} } = useSelector(state => state.user);
	const dispatch = useDispatch();

	moment.locale('es');

	const { data, loading } = useFetch('get-all-products');
	const { data:dataProductsHome } = useFetch('get-products-home', true);

	const matches = useMediaQuery('(max-width: 415px)');
	const theme = styleMaterialUiTheme();

	const [product, setProduct] = useState({});
	const [point, setPoint] = useState(0);

	// Actualizar el store de redux con los productos agregados al home cada vez que se recarga la pagina
	useEffect(() => {
		
		if (!dataProductsHome) return;
		dispatch( addProductAction(dataProductsHome.map(product => product)) );
		
	}, [dataProductsHome, dispatch]);

	// Seleccionar un producto en el 'selecter' y obtner su calificacion promedio
	const handleChange = (select) => {
		
		if (select === '') return;

		const findProduct = data.find(product => product['_id'] === select);

		const { ratingsProduct } = findProduct;

		// Obetner la suma de todas las calificaciones dadas por los diferentes usuarios
		const totalQualification = ratingsProduct.reduce((acc, el) => {
			
			return (acc += Number(el.qualification), acc);

		}, 0);
		
		const qualification = Math.round(totalQualification / ratingsProduct.length);

		setProduct(findProduct);
		setPoint(qualification);
	}

	// Agregar o eliminar un producto del home
	const addOrDeleteProduct = async text => {

		if (products.length + 1 > 9 && text === 'Agregar al home') 
			return alert('warning', ['Solo puedes agregar un maximo de 9 productos al home']);
		
		const isExists = products.some(el => el['_id'] === product['_id']);
		
		// Agregar o eliminar del store de redux
		text === 'Agregar al home'
		? dispatch( addProductAction(isExists ? products : [...products, product]) )
		: dispatch( deleteProductAction(product) );
		
		// Guardar el producto agregado o eliminado en el backend
		const formData = new FormData();
		formData.append('product', window.JSON.stringify(product));
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
		<AddProductHomePage
			addOrDeleteProduct={addOrDeleteProduct}
			data={data}
			handleChange={handleChange}
			loading={loading}
			matches={matches}
			point={point}
			product={product}
			theme={theme}
		/>
	)
}

export default AddProductHome;