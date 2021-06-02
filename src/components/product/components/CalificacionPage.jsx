import React from 'react';

import SelectionMenu from '../../../layaut/SelectionMenu';
import { categorysScore, categorysScoreValue } from '../../../utils/helper';

import { Typography, Grid } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

const CalificacionPage = ({ classes, isAuthenticated, point, setCalificacion, calificacionUser, reseñas }) => (
	<React.Fragment>
		<Grid container alignItems="center">
			<Grid item xs={3} sm={2}>
				<Typography variant="h3" component="h1" className="text-center">
			  		{point}
				</Typography>
			</Grid>

			<Grid item xs={6} sm={4}>
				<StarIcon color={`${point > 0 ? 'primary' : 'disabled'}`} />
				<StarIcon color={`${point > 1 ? 'primary' : 'disabled'}`} />
				<StarIcon color={`${point > 2 ? 'primary' : 'disabled'}`} />
				<StarIcon color={`${point > 3 ? 'primary' : 'disabled'}`} />
				<StarIcon color={`${point > 4 ? 'primary' : 'disabled'}`} />
			</Grid>
			
			<Grid item xs={3} sm={6}>	
				<Typography variant="body2" component="h1" color="textSecondary">
			  		{reseñas} reseñas, 24 preguntas y respuestas
				</Typography>
			</Grid>
		</Grid>
		
		{
			!isAuthenticated ? null
			: <SelectionMenu
				categorys={categorysScore}
				value={categorysScoreValue}
				title="Clasificacion"
				setCalificacion={setCalificacion}
				calificacionUser={calificacionUser}
			/>
		}
	</React.Fragment>
)

export default CalificacionPage;