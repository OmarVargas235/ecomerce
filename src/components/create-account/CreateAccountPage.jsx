import React from 'react';
import { RegisterContainer } from './style';
import InputPassword from '../../layaut/InputPassword';

import { TextField, Container, Button } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const CreateAccountPage = ({ classes, desactiveBtn, history, handleChange, isRequired, matches, registerUser, theme }) => (
	<RegisterContainer className="d-flex align-items-center">
		<Container maxWidth="sm">
			<h4 className="pl-1 mb-4">Completa tus datos</h4>

			<ThemeProvider theme={theme}>
				<form 
					className={`p-5 d-flex flex-column align-items-center d-sm-block ${classes.root}`} 
					noValidate 
					autoComplete="off"
					onSubmit={registerUser}
				>
					<TextField
						label="Nombre"
						color={isRequired.name ? "primary" : "secondary"}
						name="name"
						onChange={handleChange}
						error={isRequired.name}
						helperText={isRequired.name ? "El nombre es obligatorio." : ""}
						required
					/>

					<TextField
						label="Apellido"
						color={isRequired.lastName ? "primary" : "secondary"}
						name="lastName"
						onChange={handleChange}
						error={isRequired.lastName}
						helperText={isRequired.lastName ? "El apellido es obligatorio." : ""}
						required
					/>

					<TextField
						label="Email"
						color={isRequired.email ? "primary" : "secondary"}
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
						isCreateAccount={true}
					/>

					<InputPassword
						handleChange={handleChange}
						isRequired={isRequired}
						text="Repetir password"
						typeName="repeatPassword"
						isCreateAccount={true}
					/>

					<div className="mt-4 w-100">
						<Button
							type="submit"
							variant="contained"
							color="secondary"
							className={`mr-3 ${matches ? 'w-100 mb-3' : ''}`}
							disabled={desactiveBtn}
						>
					  		Crear
						</Button>

						<Button
							color="primary"
							className={`${matches ? 'w-100' : ''}`}
							disabled={desactiveBtn}
							onClick={() => history.goBack()}
						>
					  		Regresar
						</Button>
					</div>
				</form>
			</ThemeProvider>
		</Container>
	</RegisterContainer>
)

export default CreateAccountPage;