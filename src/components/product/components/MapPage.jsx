import React from 'react';

import { MapStyle } from '../style';

import { Typography, Card  } from '@material-ui/core';

const MapPage = ({ classes, mapRef, pointStart }) => (
	<MapStyle>
		<Card className={`mt-4 w-100 p-2 ${classes.root}`} variant="outlined">
			
			 <Typography variant="h6" component="h5">
	        	ubicacion del producto
	        </Typography>
			
			{
				pointStart.length === 0
				? <p className="w-100 text-center mt-3">No hay ubicacion.</p>
				: <div ref={mapRef} className="w-100 map">mapa</div>
			}
		</Card>
	</MapStyle>
)

export default MapPage;