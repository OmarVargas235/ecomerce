import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoib21hcjkwIiwiYSI6ImNrcGp0aG5neTBseTQyd29ncTlleXU3MWEifQ.dEiZMEqBdkniBVW2AW2B7A';

export const useMapbox = (pointStart=[], isEdit=false) => {

	// Referencia al DIV del mapa
    const mapRef = useRef();

    const [newCoordinates, setNewCoordinates] = useState([]);

    useEffect( () => {
		
    	if (pointStart.length === 0) return;

        const map = new mapboxgl.Map({
            container: mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: pointStart,
            zoom: 5
        });   

        // Agregando controles para aumentar zoom o para disminuir.
        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav, 'top-right');
		
		// Añadiendo marker
		const marker = new mapboxgl.Marker({
			anchor: 'top-left',
			color: '#2896A9'
		})
		.setLngLat(pointStart)
		.addTo(map);
		
		// Setea el mapa a las nuevas coordenadas
		if (newCoordinates.length !== 0) {

			map.setCenter(newCoordinates);
			marker.setLngLat(newCoordinates);
		}
		
		// Verifica si esta en la vista de editar el producto
        if (isEdit) {
			
			marker.setDraggable( true );
			marker.on('dragend', e => {
				
				const coordinates = [e.target.getLngLat().lng, e.target.getLngLat().lat];
				setNewCoordinates(coordinates);
			});
        }

    }, [pointStart, isEdit, newCoordinates]);
	
	return [
		mapRef,
		newCoordinates,
	]
}