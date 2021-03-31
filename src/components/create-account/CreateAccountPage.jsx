import React from 'react';
import { RegisterContainer } from './style';

import { TextField, Container, Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const CreateAccountPage = ({ classes, matches, theme }) => (
	<RegisterContainer className="d-flex align-items-center">
		<Container maxWidth="sm">
			<h4 className="pl-1 mb-4">Completa tus datos</h4>
			
			<ThemeProvider theme={theme}>
				<form 
					className={`p-5 d-flex flex-column align-items-center d-sm-block ${classes.root}`} 
					noValidate 
					autoComplete="off"
				>		
					<TextField
						label="Nombre"
						color="secondary"
					/>

					<TextField
						label="Apellido"
						color="secondary"
					/>

					<TextField
						label="Email"
						color="secondary"
					/>

					<TextField
						label="Password"
						color="secondary"
					/>

					<TextField
						label="Repetir password"
						color="secondary"
					/>

					<div className="mt-4 w-100">
						<Button 
							variant="contained"
							color="secondary"
							className={`mr-3 ${matches ? 'w-100 mb-3' : ''}`}
							disabled
						>
					  		Crear
						</Button>

						<Button color="primary" className={`${matches ? 'w-100' : ''}`}>
					  		Regresar
						</Button>
					</div>
				</form>
			</ThemeProvider>
		</Container>
	</RegisterContainer>
)

export default CreateAccountPage;