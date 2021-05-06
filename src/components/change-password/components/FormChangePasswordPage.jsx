import React from 'react';

import InputPassword from '../../../layaut/InputPassword';

import { Container, Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const FormChangePasswordPage = ({ theme }) => (
	<Container maxWidth="xs" className="container p-5">
		<h4 className="pl-1 mb-4 text-center">Cambiar contraseña</h4>
		
		<ThemeProvider theme={theme}>
			<form
				noValidate
				autoComplete="off"
				className="d-flex flex-column"
				// onSubmit={login}
			>
				<InputPassword
					handleChange={() => {}}
					isRequired={{}}
					text="Password"
					typeName="password"
				/>

				<InputPassword
					handleChange={() => {}}
					isRequired={{}}
					text="Repetir password"
					typeName="repeatPassword"
				/>

				<div className="mt-4">
					<Button 
						variant="contained"
						color="secondary"
						className="mr-3 w-100"
						type="submit"
						// disabled={desactiveBtn}
					>
				  		Cambiar contraseña
					</Button>
				</div>
			</form>
		</ThemeProvider>
	</Container>
)

export default FormChangePasswordPage;