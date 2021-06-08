import React, { useState, useReducer, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import $ from "jquery";

import ProductLocationPage from './ProductLocationPage';
import { reducer, initialState } from './reducer';
import ControlPanel from '../../layaut/ControlPanel';
import { requestWithToken } from '../../utils/fetch';
import { alert } from '../../utils/alert';
import { getProductsActions } from '../../redux/actions/productActions';
import { logoutUser } from '../../redux/actions/userAction';

const key = '213438341b3e7032370ce3ccbe621efd';
const urlCountries = `https://geo-battuta.net/api/country/all/?key=${key}&callback=?`;

const ProductLocation = () => {

	const { auth, dataUser } = useSelector(state => state.user);
	const { products } = useSelector(state => state.product);

	const dispatch = useDispatch();
	
	const [state, dispatchUseReducer] = useReducer(reducer, initialState);

	const [desactiveBtn, setDesactiveBtn] = useState(false);
	
	// Obtener productos del usuario
	useEffect(() => {
		
		const id = dataUser.uid;
		dispatch( getProductsActions(id) );

	}, [dispatch, dataUser]);
	
	// Hacer la peticion a la api
	useEffect(() => {
		
		// Guarda todos los paises de la api
		$.getJSON(urlCountries, countries => {

			const codes = countries.map(countrie => countrie.code);
			const names = countries.map(countrie => countrie.name);
			const obj = { title: 'Escoje un pais', categorys: names, value: codes };

			dispatchUseReducer({ type: 'COUNTRIES', payload: obj });
		    dispatchUseReducer({ type: 'COUNTRIES_MEMO', payload: obj });
		});

		return () => dispatchUseReducer({ type: 'COUNTRIES', payload: [] });

	}, []);

    const selectedProduct = index => dispatchUseReducer({
    	type: 'ID_PRODUCT',
    	payload: products[index].id,
    });

	const selected = code => {
		
		const { citys, codeCountry } = state;

		// Obtener la ciudad con su latitud y longitud
		if (citys.length > 0) {

			const names = citys.map(city => city.city);
			const findCity = citys.find(city => city.city === code);
			
			dispatchUseReducer({
		    	type: 'COUNTRIES',
		    	payload: { title: 'Escoje una ciudad', categorys: names, value: names },
		    });

			dispatchUseReducer({
		    	type: 'LATITUDE_LONGITUDE',
		    	payload: [findCity.longitude, findCity.latitude],
		    });

			return;
		}
		
		// Obtener las regiones del pais
		if (code.length === 2) {
			
			const urlRegions = `https://geo-battuta.net/api/region/${code}/all/?key=${key}&callback=?`;

			$.getJSON(urlRegions, regions => {
				
				const names = regions.map(region => region.region);
				const obj = { title: 'Escoje una region', categorys: names, value: names };

				dispatchUseReducer({ type: 'COUNTRIES', payload: obj });
			    dispatchUseReducer({ type: 'REGIONS_MEMO', payload: obj });
			});
			
			dispatchUseReducer({ type: 'CODE_COUNTRY', payload: code });

			return;
		}
		
		// Obtener las ciudades de la region
		const urlCitys = `https://geo-battuta.net/api/city/${codeCountry}/search/?region=${code}&key=${key}&callback=?`;

		$.getJSON(urlCitys, citys => {
			
			const names = citys.map(city => city.city);
			dispatchUseReducer({
		    	type: 'COUNTRIES',
		    	payload: { title: 'Escoje una ciudad', categorys: names, value: names },
		    });

		    dispatchUseReducer({ type: 'CITYS', payload: citys });
		});
	}

	const prev = () => {
		
		const { countries, countriesMemo, regionsMemo } = state;

		if (countries.title === "Escoje un pais") 
			dispatchUseReducer({ type: 'ID_PRODUCT', payload: null });

		else if (countries.title === "Escoje una region") 
			dispatchUseReducer({ type: 'COUNTRIES', payload: countriesMemo });

		else if (countries.title === "Escoje una ciudad") 
			dispatchUseReducer({ type: 'COUNTRIES', payload: regionsMemo });
		
		dispatchUseReducer({ type: 'LATITUDE_LONGITUDE', payload: [] });
		dispatchUseReducer({ type: 'CITYS', payload: [] });
	}
	
	const addLocation = async () => {
		
		const { idProduct, latLng } = state;
		const { token } = auth;
		const formData = new FormData();
		
		formData.append('id', idProduct);
		formData.append('latLng', latLng);

		const { ok, messages, isExpiredToken } = await requestWithToken('save-coordinates', token, formData, 'POST');

		if (isExpiredToken) {
			
			dispatch( logoutUser() );
			alert('error', messages);

			return;
		}

		if (ok) alert('success', ['Las coordenadas fueron agregadas al producto']);
		else alert('error', ['No se pudo agregar las coordenadas al producto']);

		// Desactivando el boton y luego activandolo cuando se quite la alerta
		setDesactiveBtn(true);
		setTimeout(() => setDesactiveBtn(false), 3000);
	}
	
	return (
		<ControlPanel
			component={() => <ProductLocationPage
				prev={prev}
				products={products}
				state={state}
				selected={selected}
				selectedProduct={selectedProduct}
			/>}
			title="Ubicacion del producto"
			text="Agrega la ubicacion del producto"
			desactiveBtn={desactiveBtn || state.latLng.length === 0}
			textButton="agregar ubicacion"
			handleClick={addLocation}
		/>
	)
}

export default ProductLocation;