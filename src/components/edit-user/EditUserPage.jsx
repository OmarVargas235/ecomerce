import React from 'react';

import { Input } from '@material-ui/core';

const EditUserPage = () => (

	<div className="py-4 px-5 text-center">
		<form className="px-4">
			<Input
				disableUnderline
				className="w-100 mb-3"
				placeholder="Nombre de usuario"
				name="name"
				type="text"
			/>

			<Input
				disableUnderline
				className="w-100 mb-3"
				placeholder="Apellido de usuario"
				name="price"
				type="text"
			/>

			<Input
				disableUnderline
				className="w-100 mb-3"
				name="img-product"
				type="file"
			/>
		</form>
	</div>
)

export default EditUserPage;