import React from 'react';

import { TealButton, TealCheckbox } from '../../utils/styleMaterialUi';

import { Input, TextareaAutosize, Divider } from '@material-ui/core';
import { FormGroup, FormControlLabel } from '@material-ui/core';

const CreateProductPage = ({ checked, handleChecked }) => (
	<React.Fragment>
		<div className="py-4 px-5 text-center">
			<form className="px-4">
				<Input
					disableUnderline
					className="w-100 mb-3"
					placeholder="Nombre del producto"
					name="name"
					type="text"
				/>

				<Input
					disableUnderline
					className="w-100 mb-3"
					placeholder="Precio del producto"
					name="price"
					type="text"
				/>

				<Input
					disableUnderline
					className="w-100 mb-3"
					placeholder="Cantidad del producto"
					name="stock"
					type="number"
				/>

				<Input
					disableUnderline
					className="w-100 mb-3"
					name="img-product"
					type="file"
				/>

				<TextareaAutosize
					className="mb-3 pl-3 pt-3 w-100"
					rowsMin={5}
					placeholder="Descripcion del producto"
				/>
			</form>
		</div>

		<Divider light />

		<div className="py-4 px-5 text-center">
			<h5>Escoje las categorias del producto</h5>
			
			<FormGroup>
				<FormControlLabel
					label="Juegos PC"
					labelPlacement="end"
					control={<TealCheckbox name="checkedA" />}
				/>

				<FormControlLabel
					label="Consolas"
					labelPlacement="end"
					control={<TealCheckbox name="checkedB" />}
				/>

				<FormControlLabel
					label="Accesorios"
					labelPlacement="end"
					control={<TealCheckbox name="checkedC" />}
				/>

				<FormControlLabel
					label="Juegos de consolas"
					labelPlacement="end"
					control={<TealCheckbox name="checkedD" />}
				/>

				<FormControlLabel
					label="Componentes"
					labelPlacement="end"
					control={<TealCheckbox name="checkedF" />}
				/>

				<FormControlLabel
					label="Decoracion"
					labelPlacement="end"
					control={<TealCheckbox name="checkedG" />}
				/>
			</FormGroup>
		</div>

		<Divider light />

		<div className="mt-3 mr-3 text-right">
			<TealButton variant="contained">Crear Producto</TealButton>
		</div>
	</React.Fragment>
)

export default CreateProductPage;