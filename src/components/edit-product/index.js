import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ControlPanel from '../../layaut/ControlPanel';
import EditProductPage from './EditProductPage';
import { getProductActions } from '../../redux/actions/productActions';
import { useFormNotController } from '../../customHooks/useFormNotController';
import { useValidateForm } from '../../customHooks/useValidateForm';
import { alert } from '../../utils/alert';
import { requestWithToken } from '../../utils/fetch';
import { logoutUser } from '../../redux/actions/userAction';

let categories = new Set();

const EditProduct = ({ history, match }) => {
	
	const { id } = match.params;
	const user = useSelector(state => state.user);
	const product = useSelector(state => state.product.product);
	const loading = useSelector(state => state.product.loading);

	const dispatch = useDispatch();

	const [formRef, getDataRef, desactiveBtn, setDesactiveBtn] = useFormNotController({
		name: React.createRef(''),
		price: React.createRef(0),
		stock: React.createRef(0),
		description: React.createRef(''),
		img: React.createRef(null),
	});

	const [required, validate] = useValidateForm({
		name: false,
		price: false,
		stock: false,
		description: false,
	});
	const [isRequired, setIsRequired] = useState({});

	useEffect(() => {
		
		dispatch( getProductActions(id) );

	}, [dispatch, user, id]);

	if (Object.keys(product).length > 0) categories = product.categories;

	const editProduct = async e => {

		e.preventDefault();

		const formDataRef = getDataRef();

		const { img:images, ...productInfo } = formDataRef;
		const token = user.auth.token;

		if (categories.size === 0) alert('error', ['Debe de seleccionar al menos una categoria']);

		if ( validate(productInfo) || images.length > 6 || images.length === 0) {
			
			setIsRequired({...required, images: images.length > 6 || images.length === 0});
			return;
		}

		setIsRequired({required, images: false});

		const formData = new FormData();
		Array.from(images).forEach(img => formData.append('img-product', img) );
		formData.append('categories', Array.from(categories));
		formData.append('description', productInfo.description);
		formData.append('name', productInfo.name);
		formData.append('price', productInfo.price);
		formData.append('stock', productInfo.stock);

		const { ok, messages, authBD } = await requestWithToken(`edit-product/${id}`, token, formData, 'POST');

		alert(ok ? 'success' : 'error', messages);
		
		// Si el token ya a expirado se deslogea
		if (authBD) {
			
			dispatch( logoutUser() );
			return;
		}

		if (ok) return history.push('/mis-productos');
		
		// Desactivando el boton y luego activandolo cuando se quite la alerta
		setDesactiveBtn(true);
		setTimeout(() => setDesactiveBtn(false), 3000);
  	}

	return (
		<ControlPanel
			component={() => <EditProductPage
				categories={categories}
				formRef={formRef}
				isRequired={isRequired}
				loading={loading}
				product={product}
			/>}
			title="Editar producto"
			text="Edita los datos que creas correspondientes aqui"
			desactiveBtn={desactiveBtn}
			textButton="Editar producto"
			handleClick={editProduct}
		/>
	)
}

export default EditProduct;