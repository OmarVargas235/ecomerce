import React from 'react';

import { MapStyle } from '../style';

import { Typography, Card  } from '@material-ui/core';

const MapPage = ({ classes, mapRef }) => (
	<MapStyle>
		<Card className={`mt-4 w-100 p-2 ${classes.root}`} variant="outlined">
			
			 <Typography variant="h6" component="h5">
	        	ubicacion del producto
	        </Typography>

			
			<div ref={mapRef} className="w-100">mapa</div>
		</Card>
	</MapStyle>
)

export default MapPage;