import React from 'react';

import CommentsPage from './CommentsPage';

import { TextField, Button, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pagination from '@material-ui/lab/Pagination';

const ChatPage = ({ isAuthenticated, matches, nameUser }) => (
	<div className="mt-5 chat">

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