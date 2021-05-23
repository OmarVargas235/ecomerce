import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ControlPanel from '../../layaut/ControlPanel';
import EditProductPage from './components/EditProductPage';
import { getProductActions } from '../../redux/actions/productActions';
import { useFormNotController } from '../../customHooks/useFormNotController';
import { useValidateForm } from '../../customHooks/useValidateForm';
import { alert } from '../../utils/alert';

let categories = new Set();

const EditProduct = ({ match }) => {
	
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
		
		const token = user.auth.token;
		dispatch( getProductActions({ token, id }) );

	}, [dispatch, user]);

	if (Object.keys(product).length > 0) categories = product.categories;

	const editProduct = async e => {

		e.preventDefault();

		const formDataRef = getDataRef();

		const { img:images, ...productInfo } = formDataRef;

		if (categories.size === 0) alert('error', ['Debe de seleccionar al menos una categoria']);

		if ( validate(productInfo) || images.length === 1) {
			
			setIsRequired({...required, images: images.length === 1});
			return;
		}
  	}

	return (
		<ControlPanel
			component={() => <EditProductPage
				categories={categories}
				editProduct={editProduct}
				formRef={formRef}
				isRequired={isRequired}
				loading={loading}
				product={product}
			/>}
			title="Editar producto"
			text="Edita los datos que creas correspondientes aqui"
		/>
	)
}

export default EditProduct;