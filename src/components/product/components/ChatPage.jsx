import React from 'react';

import Comments from './Comments';
import SelectionMenu from '../../../layaut/SelectionMenu';
import { categorysScore } from '../../../utils/helper';

import { TextField, Button, Typography, Grid } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pagination from '@material-ui/lab/Pagination';

const ChatPage = ({ classes, theme }) => (
	<div className="mt-5 chat">
		<div className="d-flex align-items-center mb-4">
			<Typography variant="h3" component="h1">
		  		4.9
			</Typography>

			<span className="mx-3">
				<StarIcon color="disabled" />
				<StarIcon color="disabled" />
				<StarIcon color="disabled" />
				<StarIcon color="disabled" />
				<StarIcon color="disabled" />
			</span>

			<Typography variant="body2" component="h1" color="textSecondary">
		  		2069 reseñas, 24 preguntas y respuestas
			</Typography>
		</div>

		<SelectionMenu
			title="Clasificacion"
			theme={theme}
			categorys={categorysScore}
		/>

		<h3>Preguntas y Respuesta</h3>

		<h5 className="my-4">Pregunte a Omar</h5>

		<form className={classes.root} noValidate autoComplete="off">
			<Grid container spacing={3}>		
				<Grid item xs={6}>
					<Autocomplete
						freeSolo
						options={[].map((option) => option.title)}
						renderInput={(params) => (
							<TextField 
								{...params}
								label="Escribir comentario"
								margin="normal"
								variant="outlined"
								color="secondary"
							/>
						)}
					/>
				</Grid>

				<Grid item xs={6}>
					<Button variant="contained" color="primary" className="ml-3 mt-4">
					  	Secondary
					</Button>			
				</Grid>
			</Grid>
	    </form>

	    <Comments />
	    <Comments />
	    <Comments />
	    <Comments />
	    <Comments />

	    <div className="mt-4">
			<Pagination count={10} color="secondary" />
    	</div>
	</div>
)

export default ChatPage;