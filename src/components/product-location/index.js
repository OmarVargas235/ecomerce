import React, { useState, useEffect, useRef } from 'react';
import $ from "jquery";
import mapboxgl from 'mapbox-gl';

import ProductLocationPage from './ProductLocationPage';
import ControlPanel from '../../layaut/ControlPanel';

const key = '213438341b3e7032370ce3ccbe621efd';
const urlCountries = `https://geo-battuta.net/api/country/all/?key=${key}&callback=?`;

const ProductLocation = () => {

	const mapRef = useRef();
	
	const [countries, setCountries] = useState({});
	const [countriesMemo, setCodeCountriesMemo] = useState({});
	const [regions, setRegions] = useState({});
	const [citys, setCitys] = useState([]);
	const [codeCountry, setCodeCountry] = useState('');
	const [latLng, setLatLng] = useState({});

	useEffect(() => {
		
		// Guarda todos los paises de la api
		$.getJSON(urlCountries, countries => {

			const codes = countries.map(countrie => countrie.code);
			const names = countries.map(countrie => countrie.name);
			
			setCountries({ title: 'Escoje un pais', categorys: names, value: codes });
			setCodeCountriesMemo({ title: 'Escoje un pais', categorys: names, value: codes });
		});

		return () => setCountries([]);

	}, []);

	useEffect( () => {

        const map = new mapboxgl.Map({
            container: mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-66.87919, 10.48801],
            zoom: 5
        });
        
        // Agregando controles para aumentar zoom o para disminuir.
        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav, 'top-right');

		new mapboxgl.Marker({
			anchor: 'top-left',
			color: '#2896A9'
		})
		.setLngLat([-66.0, 8.0])
		.addTo(map)
		.setDraggable( true );

    }, []);

	const prev = () => {

		if (countries.title === "Escoje una region") setCountries( countriesMemo );
		else if (countries.title === "Escoje una ciudad") setCountries( regions );

		setLatLng({});
		setCitys([]);
	}

	const selected = code => {
		
		// Obtener la ciudad con su latitud y longitud para dibujarla en el mapa
		if (citys.length > 0) {

			const names = citys.map(city => city.city);
			const findCity = citys.find(city => city.city === code);
			
			setCountries({ title: 'Escoje una ciudad', categorys: names, value: names });
			setLatLng({lat: findCity.latitude, lng: findCity.longitude});

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
	
	const addLocation = () => {

		console.log(latLng);
	}
	
	return (
		<ControlPanel
			component={() => <ProductLocationPage
				countries={countries}
				latLng={latLng}
				mapRef={mapRef}
				prev={prev}
				selected={selected}
			/>}
			title="Ubicacion del producto"
			text="Agrega la ubicacion del producto"
			// desactiveBtn={desactiveBtn}
			desactiveBtn={Object.keys(latLng).length === 0}
			textButton="agregar ubicacion"
			handleClick={addLocation}
		/>
	)
}

export default ProductLocation;