import React from 'react';
import { Typography, Card, CardActions  } from '@material-ui/core';

const Map = ({ classes }) => (
	<Card className={`mt-4 p-2 ${classes.root}`} variant="outlined">
		
		 <Typography variant="h6" component="h5">
        	ubicacion del producto
        </Typography>

		<CardActions>
			mapa
		</CardActions>
	</Card>
)

export default Map;