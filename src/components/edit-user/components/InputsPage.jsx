import React from 'react';

import { Input, TextareaAutosize, FormControl, FormHelperText } from '@material-ui/core';

const InputsPage = ({ dataUser, formRef, isRequired }) => (
	<div className="py-4 px-5 text-center">
		<div className="px-4">
			<FormControl className="w-100 mb-3">
				<Input
					disableUnderline
					placeholder="Nombre de usuario"
					name="name"
					type="text"
					defaultValue={dataUser.name}
					ref={formRef.name}
					autoComplete="off"
				/>

				<FormHelperText
					error={isRequired.name}
				>{isRequired.name ? 'El nombre es obligatorio' : ''}</FormHelperText>
			</FormControl>
			
			<FormControl className="w-100 mb-3">
				<Input
					disableUnderline
					placeholder="Apellido de usuario"
					name="lastName"
					defaultValue={dataUser.lastName}
					ref={formRef.lastName}
					type="text"
				/>

				<FormHelperText
					error={isRequired.lastName}
				>{isRequired.lastName ? 'El apellido es obligatorio' : ''}</FormHelperText>
			</FormControl>

			<FormControl className="w-100">
				<TextareaAutosize
					className="p-3"
					rowsMin={5}
					name="description"
					defaultValue={dataUser.description ? dataUser.description : ''}
					ref={formRef.description}
					placeholder="Escribe alguna descripcion sobre ti o tu negocio"
				/>
			</FormControl>
		</div>
	</div>
)

export default InputsPage;