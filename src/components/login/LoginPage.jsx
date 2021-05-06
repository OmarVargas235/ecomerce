import React from 'react';

import { LoginContainer } from './style';
import InputPassword from '../../layaut/InputPassword';

import { TextField, Container, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const LoginPage = ({ checked, desactiveBtn, formData, history, handleChange, isRequired, login, setChecked, theme }) => (
	<LoginContainer className="d-flex align-items-center px-3">
		<Container maxWidth="xs" className="container p-5">
			<h4 className="pl-1 mb-4 text-center">Iniciar sesion</h4>
			
			<ThemeProvider theme={theme}>
				<form
					noValidate
					autoComplete="off"
					className="d-flex flex-column"
					onSubmit={login}
				>
					<TextField
						defaultValue={formData.email}
						label="Email"
						color={isRequired.email ? "primary" : "secondary"}
						className="mb-4"
						name="email"
						onChange={handleChange}
						error={isRequired.email}
						helperText={isRequired.email ? "El email es obligatorio." : ""}
						required
					/>

					<InputPassword
						handleChange={handleChange}
						isRequired={isRequired}
						text="Password"
						typeName="password"
					/>

					<FormControlLabel
						control={
							<Checkbox
								checked={checked}
								color="secondary"
								onChange={event => setChecked(event.target.checked)}
								inputProps={{ 'aria-label': 'secondary checkbox' }}
							/>
						}
						label="Recordar"
					/>

					<div className="mt-4">
						<Button 
							variant="contained"
							color="secondary"
							className="mr-3 w-100"
							type="submit"
							disabled={desactiveBtn}
						>
					  		Iniciar
						</Button>

						<Button
							color="primary"
							className="w-100 mt-4"
							disabled={desactiveBtn}
							onClick={() => history.push('/cambiar-contraseña')}
						>
					  		Cambiar contraseña
						</Button>
					</div>
				</form>
			</ThemeProvider>
		</Container>
	</LoginContainer>
)

export default LoginPage;