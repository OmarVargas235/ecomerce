import React from 'react';

import { TealButton } from '../../utils/styleMaterialUi';

import { Input, Divider } from '@material-ui/core';

const EditUserPage = () => (

	<div className="pt-4 text-center">
		<form>
			<div className="px-4">
				<Input
					disableUnderline
					className="w-100 mb-3 px-5"
					placeholder="Nombre de usuario"
					name="name"
					type="text"
				/>
				
				<Input
					disableUnderline
					className="w-100 mb-3 px-5"
					placeholder="Apellido de usuario"
					name="price"
					type="text"
				/>
				
				<Input
					disableUnderline
					className="w-100 mb-3 px-5"
					name="img-product"
					type="file"
				/>
			</div>

			<Divider light />

			<div className="mt-3 px-4 mr-5 text-right">
				<TealButton variant="contained">Editar usuario</TealButton>
			</div>
		</form>
	</div>
)

export default EditUserPage;