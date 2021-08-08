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

	useEffect(() => {
		
		if (!dataProductsHome) return;
		
		dispatch( addProductAction(dataProductsHome.map(product => product.product)) );
		
	}, [dataProductsHome, dispatch]);

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

	const selectedOption = async text => {
		
		const isExists = products.some(el => el['_id'] === product['_id']);
		
		text === 'Agregar al home'
		? dispatch( addProductAction(isExists ? products : [...products, product]) )
		: dispatch( deleteProductAction(product) );
		
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
			data={data}
			handleChange={handleChange}
			loading={loading}
			matches={matches}
			point={point}
			product={product}
			selectedOption={selectedOption}
			theme={theme}
		/>
	)
}

export default AddProductHome;