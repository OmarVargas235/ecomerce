import React, { useState } from 'react';

import { styleMaterialUiTheme } from '../../../utils/styleMaterialUi';

import { Container, Button, IconButton, FormControl } from '@material-ui/core';
import { InputLabel, Input, InputAdornment } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const FormChangePassword = () => {

	const [ theme ] = styleMaterialUiTheme();
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Container maxWidth="xs" className="container p-5">
			<h4 className="pl-1 mb-4 text-center">Cambiar contraseña</h4>
			
			<ThemeProvider theme={theme}>
				<form
					noValidate
					autoComplete="off"
					className="d-flex flex-column"
					// onSubmit={login}
				>

					<FormControl className="mb-3">
						<InputLabel
							htmlFor="standard-adornment-password"
							color="primary"
							// color={isRequired.password ? "primary" : "secondary"}
						>Password *</InputLabel>

						<Input
							color="secondary"
							type={showPassword ? 'text' : 'password'}
							// onChange={handleChange}
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

					<FormControl className="mb-3">
						<InputLabel
							htmlFor="standard-adornment-password"
							color="primary"
							// color={isRequired.password ? "primary" : "secondary"}
						>Repetir paassword *</InputLabel>

						<Input
							color="secondary"
							type={showPassword ? 'text' : 'password'}
							// onChange={handleChange}
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
}

export default FormChangePassword;