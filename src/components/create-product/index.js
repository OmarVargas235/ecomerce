import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestWithToken } from '../../utils/fetch';
import { logoutUserAction } from '../../redux/actions/userAction';
import ControlPanel from '../../layaut/ControlPanel';
import CreateProductPage from './CreateProductPage';
import { useFormNotController } from '../../customHooks/useFormNotController';
import { useValidateForm } from '../../customHooks/useValidateForm';
import { alert } from '../../utils/alert';

const categories = new Set();

const CreateProduct = ({ history }) => {
	
	const dispatch = useDispatch();
	const dataUser = useSelector(state => state.user.dataUser);
	const token = useSelector(state => state.user.auth.token);

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

	useEffect(() => () => categories.clear(), []);

  	const createProduct = async e => {

		e.preventDefault();

		const formDataRef = getDataRef();

		const { img:images, ...productInfo } = formDataRef;

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
		formData.append('id', dataUser.uid);

		const { ok, messages, isExpiredToken } = await requestWithToken('create-product', token, formData, 'POST');
		
		// Si el token ya a expirado se deslogea
		if (isExpiredToken) {
			
			dispatch( logoutUserAction(dataUser.uid) );
			alert('error', messages);
			
			return;
		}

		alert(ok ? 'success' : 'error', messages);

		if (ok) history.push('/mis-productos');

		// Desactivando el boton y luego activandolo cuando se quite la alerta
		setDesactiveBtn(!ok ? true : false);
		setTimeout(() => setDesactiveBtn(false), 3000);
  	}
	
	return (
		<ControlPanel
			component={() => <CreateProductPage
				categories={categories}
				formRef={formRef}
				isRequired={isRequired}
			/>}
			title="Crear producto"
			text="Crea el producto llenando todos los campos aqui"
			textButton="crear producto"
			handleClick={createProduct}
			desactiveBtn={desactiveBtn}
		/>
	)
}

export default CreateProduct;