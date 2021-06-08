import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import $ from "jquery";

import ProductLocationPage from './ProductLocationPage';
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

	const mapRef = useRef();
	
	const [countries, setCountries] = useState({});
	const [countriesMemo, setCodeCountriesMemo] = useState({});
	const [regions, setRegions] = useState({});
	const [citys, setCitys] = useState([]);
	const [codeCountry, setCodeCountry] = useState('');
	const [latLng, setLatLng] = useState([]);
	const [idProduct, setIdProduct] = useState(null);
	const [desactiveBtn, setDesactiveBtn] = useState(false);
	
	// Obtener productos del usuario
	useEffect(() => {
		
		const id = dataUser.uid;
		dispatch( getProductsActions(id) );

	}, [dispatch, dataUser]);
	
	// Hacer la peticion a la api
	useEffect(() => {
		
		// Guarda todos los paises de la api
		// $.getJSON(urlCountries, countries => {

		// 	const codes = countries.map(countrie => countrie.code);
		// 	const names = countries.map(countrie => countrie.name);
			
		// 	setCountries({ title: 'Escoje un pais', categorys: names, value: codes });
		// 	setCodeCountriesMemo({ title: 'Escoje un pais', categorys: names, value: codes });
		// });

		return () => setCountries([]);

	}, []);

    const selectedProduct = index => setIdProduct(products[index].id);

	const selected = code => {
		
		// Obtener la ciudad con su latitud y longitud para dibujarla en el mapa
		if (citys.length > 0) {

			const names = citys.map(city => city.city);
			const findCity = citys.find(city => city.city === code);
			
			setCountries({ title: 'Escoje una ciudad', categorys: names, value: names });
			setLatLng([findCity.longitude, findCity.latitude]);

			return;
		}
		
		// Obtener las regiones del pais
		if (code.length === 2) {
			
			const urlRegions = `https://geo-battuta.net/api/region/${code}/all/?key=${key}&callback=?`;

			$.getJSON(urlRegions, regions => {
				
				const names = regions.map(region => region.region);
				setCountries({ title: 'Escoje una region', categorys: names, value: names });
				setRegions({ title: 'Escoje una region', categorys: names, value: names });
			});

			setCodeCountry(code);

			return;
		}
		
		// Obtener las ciudades de la region
		const urlCitys = `https://geo-battuta.net/api/city/${codeCountry}/search/?region=${code}&key=${key}&callback=?`;

		$.getJSON(urlCitys, citys => {
			
			const names = citys.map(city => city.city);		
			setCountries({ title: 'Escoje una ciudad', categorys: names, value: names });
			setCitys(citys);
		});
	}

	const prev = () => {
		
		if (countries.title === "Escoje un pais") setIdProduct(null);
		else if (countries.title === "Escoje una region") setCountries( countriesMemo );
		else if (countries.title === "Escoje una ciudad") setCountries( regions );

		setLatLng([]);
		setCitys([]);
	}
	
	const addLocation = async () => {

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
				countries={countries}
				idProduct={idProduct}
				latLng={latLng}
				mapRef={mapRef}
				prev={prev}
				products={products}
				selected={selected}
				selectedProduct={selectedProduct}
			/>}
			title="Ubicacion del producto"
			text="Agrega la ubicacion del producto"
			desactiveBtn={desactiveBtn || latLng.length === 0}
			textButton="agregar ubicacion"
			handleClick={addLocation}
		/>
	)
}

export default ProductLocation;