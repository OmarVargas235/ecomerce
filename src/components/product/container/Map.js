import React from 'react';

import MapPage from '../components/MapPage';
import { useMapbox } from '../../../customHooks/useMapbox';

const Map = ({ classes, pointStart }) => {

	const [ mapRef ] = useMapbox(pointStart);

	return (
		<MapPage
			classes={classes}
			mapRef={mapRef}
			pointStart={pointStart}
		/>
	)
}

export default Map;