import React from 'react';

import CommentsPage from './CommentsPage';
import SelectionMenu from '../../../layaut/SelectionMenu';
import { categorysScore, categorysScoreValue } from '../../../utils/helper';

import { TextField, Button, Typography, Grid } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pagination from '@material-ui/lab/Pagination';

const ChatPage = ({ classes, isAuthenticated, matches, nameUser, theme }) => (
	<div className="mt-5 chat">
		<Grid container alignItems="center">
			<Grid item xs={3} sm={2}>
				<Typography variant="h3" component="h1">
			  		4.9
				</Typography>
			</Grid>

			<Grid item xs={6} sm={4}>
				<StarIcon color="disabled" />
				<StarIcon color="disabled" />
				<StarIcon color="disabled" />
				<StarIcon color="disabled" />
				<StarIcon color="disabled" />
			</Grid>
			
			<Grid item xs={3} sm={6}>	
				<Typography variant="body2" component="h1" color="textSecondary">
			  		2069 reseñas, 24 preguntas y respuestas
				</Typography>
			</Grid>
		</Grid>
		
		{
			!isAuthenticated ? null
			: <SelectionMenu
				categorys={categorysScore}
				value={categorysScoreValue}
				title="Clasificacion"
				theme={theme}
			/>
		}

		<h3 className="mt-4">Preguntas y Respuesta</h3>

		<h5 className="my-4">Pregunte a <span className="text-capitalize">{nameUser}</span></h5>

		{
			!isAuthenticated ? null
			: <form className="ml-3" noValidate autoComplete="off">
				<Grid container spacing={3}>		
					<Grid item xs={7} sm={6} className="px-0">
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

					<Grid item xs={5} sm={6} className="px-0">
						<Button
							variant="contained"
							color="primary"
							size={matches ? "small" : "large"}
							className="ml-3 mt-4"
						>
						  	Secondary
						</Button>			
					</Grid>
				</Grid>
		    </form>
		}


	    <CommentsPage />
	    <CommentsPage />
	    <CommentsPage />
	    <CommentsPage />
	    <CommentsPage />

	    <div className="mt-4 d-flex justify-content-center">
			<Pagination
				defaultPage={1}
				siblingCount={0}
				boundaryCount={1}
				count={10}
				color="secondary"
			/>
    	</div>
	</div>
)

export default ChatPage;