import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import MapPage from '../components/MapPage';

// const pointStart = {
//     lng: -122.4725,
//     lat: 37.8010,
//     zoom: 13.5
// }

mapboxgl.accessToken = 'pk.eyJ1Ijoib21hcjkwIiwiYSI6ImNrcGp0aG5neTBseTQyd29ncTlleXU3MWEifQ.dEiZMEqBdkniBVW2AW2B7A';

const Map = ({ classes }) => {

	// Referencia al DIV del mapa
    const mapRef = useRef();

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
		.addTo(map);

    }, []);

	return (
		<MapPage
			classes={classes}
			mapRef={mapRef}
		/>
	)
}

export default Map;