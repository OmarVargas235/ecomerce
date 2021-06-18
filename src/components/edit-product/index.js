import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ControlPanel from '../../layaut/ControlPanel';
import EditProductPage from './EditProductPage';
import { useFormNotController } from '../../customHooks/useFormNotController';
import { useValidateForm } from '../../customHooks/useValidateForm';
import { alert } from '../../utils/alert';
import { requestWithToken } from '../../utils/fetch';
import { getProductActions } from '../../redux/actions/productActions';
import { logoutUserAction } from '../../redux/actions/userAction';
import { useMapbox } from '../../customHooks/useMapbox';
import { SocketContext } from '../../context/SocketContext';

let categories = new Set();

const EditProduct = ({ history, match }) => {
	
	const user = useSelector(state => state.user);
	const { product, loading } = useSelector(state => state.product);
	const dispatch = useDispatch();

	const { id } = match.params;

	const [ mapRef, newCoordinates ] = useMapbox(product.location, true);

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

	const { socket, online } = useContext( SocketContext );

	const [isRequired, setIsRequired] = useState({});
	
	// Obtener el producto
	useEffect(() => dispatch( getProductActions(id) ), [dispatch, user, id]);
	
	// Sobreescribir las categorias
	if (Object.keys(product).length > 0) categories = product.categories;

	const editProduct = async e => {

		e.preventDefault();

		const formDataRef = getDataRef();

		const { img:images, ...productInfo } = formDataRef;
		const token = user.auth.token;

		if (categories.size === 0) alert('error', ['Debe de seleccionar al menos una categoria']);

		if ( validate(productInfo) || images.length > 6) {
			
			setIsRequired({...required, images: images.length > 6});
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

		const { ok, messages, isExpiredToken } = await requestWithToken(`edit-product/${id}`, token, formData, 'POST');
		
		// Si el token ya a expirado se deslogea
		if (isExpiredToken) {
			
			dispatch( logoutUserAction(user.dataUser.uid) );
			alert('error', messages);

			return;
		}
		
		// Sobreescribir las coordenadas mediante sockets
		const coordinates = newCoordinates.length === 0 ? product.location : newCoordinates;
		const sendSocket = { coordinates, id };
		
		if (online) socket.emit('edit-coordinates', sendSocket);

		alert(ok ? 'success' : 'error', messages);

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
				mapRef={mapRef}
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