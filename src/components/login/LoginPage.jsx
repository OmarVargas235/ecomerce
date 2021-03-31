import React from 'react';
import { LoginContainer } from './style';

import { TextField, Container, Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const LoginPage = ({ theme }) => (
	<LoginContainer className="d-flex align-items-center px-3">
		<Container maxWidth="xs" className="container p-5">
			<h4 className="pl-1 mb-4 text-center">Iniciar sesion</h4>
			
			<ThemeProvider theme={theme}>
				<form
					noValidate
					autoComplete="off"
					className="d-flex flex-column"
				>		

					<TextField
						label="Email"
						color="secondary"
						className="mb-4"
					/>

					<TextField
						label="Password"
						color="secondary"
						className="mb-3"
					/>

					<div className="mt-4">
						<Button 
							variant="contained"
							color="secondary"
							className="mr-3 w-100"
						>
					  		Iniciar
						</Button>

						<Button color="primary" className="w-100 mt-4">
					  		Crear cuenta
						</Button>
					</div>
				</form>
			</ThemeProvider>
		</Container>
	</LoginContainer>
)

export default LoginPage;