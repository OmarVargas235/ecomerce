import React from 'react';

import { EditProductStyle } from './style';
import { TealButton } from '../../utils/styleMaterialUi';

import { Input, TextareaAutosize, Divider } from '@material-ui/core';

const EditProductPage = () => (
	<EditProductStyle className="pt-4 text-center">
		<form>
			<div className="px-4">
				<Input
					disableUnderline
					className="w-100 mb-3 px-5"
					placeholder="Nombre del producto"
					value="Audifonos Led"
					name="name"
					type="text"
				/>
				
				<Input
					disableUnderline
					className="w-100 mb-3 px-5"
					placeholder="Precio del producto"
					value="$177.600.000"
					name="price"
					type="text"
				/>
				
				<Input
					disableUnderline
					className="w-100 mb-3 px-5"
					name="img-product"
					type="file"
				/>

				<div className="px-5">
					<TextareaAutosize
						className="w-100 mb-3 px-3"
						rowsMin={6}
						placeholder="Descripcion del producto"
						defaultValue="Audifonos Con Led"
					/>
				</div>
			</div>

			<Divider light />

			<div className="mt-3 px-4 mr-5 text-right">
				<TealButton variant="contained">Crear Producto</TealButton>
			</div>
		</form>
	</EditProductStyle>
)

export default EditProductPage;