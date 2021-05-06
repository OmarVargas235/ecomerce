import React from 'react';

import { TextField, Container, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const ChangePasswordPage = ({ checked, changPassword, desactiveBtn, formData, handleChange, isRequired, setChecked, theme }) => (
	
	<div className="d-flex align-items-center px-3">
		<Container maxWidth="xs" className="container p-5">
			<h4 className="pl-1 mb-4 text-center">Cambiar tu contraseña</h4>
			
			<ThemeProvider theme={theme}>
				<form
					noValidate
					autoComplete="off"
					className="d-flex flex-column"
					onSubmit={changPassword}
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

					<FormControlLabel
						control={
							<Checkbox
								color="secondary"
								checked={checked}
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
					  		Cambiar contraseña
						</Button>

						<Button
							color="primary"
							className="w-100 mt-4"
							disabled={desactiveBtn}
						>
					  		Volver
						</Button>
					</div>
				</form>
			</ThemeProvider>
		</Container>
	</div>
)

export default ChangePasswordPage;