import React from 'react';

import Comments from '../container/Comments';

import { TextField, Button, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pagination from '@material-ui/lab/Pagination';

const ChatPage = ({ comments, desactiveBtn, end, handleChange, handleChangePage, initial, isAuthenticated, isRequired, leaveComment, matches, nameUser, qualifications }) => (
	<div className="mt-5 chat">

		<h3 className="mt-4">Preguntas y Respuesta</h3>

		<h5 className="my-4">Pregunte a <span className="text-capitalize">{nameUser}</span></h5>

		{
			!isAuthenticated ? null
			: <form className="ml-3" noValidate autoComplete="off" onSubmit={leaveComment}>
				<Grid container spacing={3}>		
					<Grid item xs={7} sm={6} className="px-0">
						<Autocomplete
							freeSolo
							options={[].map((option) => option.title)}
							renderInput={(params) => (
								<TextField 
									{...params}
									label="Escribir comentario"
									name="comment"
									margin="normal"
									variant="outlined"
									color={isRequired.comment ? "primary" : "secondary"}
									onChange={handleChange}
									error={isRequired.comment}
									helperText={isRequired.comment ?"El campo esta vacio" : ""}
									required
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
							type="submit"
							disabled={desactiveBtn}
						>
						  	Secondary
						</Button>			
					</Grid>
				</Grid>
		    </form>
		}

		{
			comments.length === 0 ? <div className="text-center mt-5">No hay comentarios</div>
			: <React.Fragment>
				{
					comments.slice(initial, end).map((comment, index) => (
						<Comments
							key={index}
							comment={comment}
							qualifications={qualifications}
						/>
					))
				}
			</React.Fragment>
		}
		
		{
			comments.length === 0 ? null
			: <div className="mt-4 d-flex justify-content-center">
				<Pagination
					defaultPage={1}
					siblingCount={0}
					boundaryCount={1}
					count={Math.ceil(comments.length / 5)}
					color="secondary"
					onChange={handleChangePage}
				/>
	    	</div>
		}
	</div>
)

export default ChatPage;