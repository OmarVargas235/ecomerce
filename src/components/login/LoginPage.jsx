import React, { useState } from 'react';
import { LoginContainer } from './style';

import { TextField, Container, Button, Checkbox } from '@material-ui/core';
import { IconButton, FormControl, InputLabel, Input, InputAdornment } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const LoginPage = ({ checked, desactiveBtn, formData, history, handleChange, isRequired, login, setChecked, theme }) => {

	const [showPassword, setShowPassword] = useState(false);

	return (
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

						<FormControl className="mb-3" error={isRequired.password}>
							<InputLabel
								htmlFor="standard-adornment-password"
								color={isRequired.password ? "primary" : "secondary"}
							>Password *</InputLabel>

							<Input
								color="secondary"
								type={showPassword ? 'text' : 'password'}
								onChange={handleChange}
								name="password"
								endAdornment={
									<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={() => setShowPassword(!showPassword )}
										onMouseDown={e => e.preventDefault()}
									>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>

									</InputAdornment>
								}
							/>
						</FormControl>

						<div>
							<Checkbox
								checked={checked}
								color="secondary"
								onChange={event => setChecked(event.target.checked)}
								inputProps={{ 'aria-label': 'secondary checkbox' }}
							/>
						</div>

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
}

export default LoginPage;