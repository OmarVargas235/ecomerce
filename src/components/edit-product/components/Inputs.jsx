import React from 'react';

import { Input, TextareaAutosize, FormControl, FormHelperText } from '@material-ui/core';

const Inputs = ({ formRef, isRequired, product }) => (
	<div className="py-4 px-5 text-center">
		<div className="px-4">
			<FormControl className="w-100 mb-3">
				<Input
					disableUnderline
					placeholder="Nombre del producto"
					name="name"
					type="text"
					ref={formRef.name}
					defaultValue={product.name}
					autoComplete="off"
				/>
				<FormHelperText
					error={isRequired.name}
				>{isRequired.name ? 'El nombre es obligatorio' : ''}</FormHelperText>
			</FormControl>

			<FormControl className="w-100 mb-3">
				<Input
					disableUnderline
					placeholder="Precio del producto"
					name="price"
					type="text"
					ref={formRef.price}
					defaultValue={product.price}
				/>

				<FormHelperText
					error={isRequired.price}
				>{isRequired.price ? 'El precio es obligatorio' : ''}</FormHelperText>
			</FormControl>
			
			<FormControl className="w-100 mb-3">
				<Input
					disableUnderline
					placeholder="Cantidad del producto"
					name="stock"
					type="text"
					ref={formRef.stock}
					defaultValue={product.stock}
				/>

				<FormHelperText
					error={isRequired.stock}
				>{isRequired.stock ? 'El stock es obligatorio' : ''}</FormHelperText>
			</FormControl>
			
			<FormControl className="w-100 mb-3">
				<Input
					disableUnderline
					name="img"
					type="file"
					inputProps={{ multiple: true }}
					ref={formRef.img}
				/>
			
				<FormHelperText
					error={isRequired.images}
				>{isRequired.images ? 'Debe de seleccionar al menos 2 imagenes' : ''}</FormHelperText>
			</FormControl>
			
			<FormControl className="w-100">
				<TextareaAutosize
					className="pl-3 pt-3"
					rowsMin={5}
					placeholder="Descripcion del producto"
					name="description"
					ref={formRef.description}
					defaultValue={product.description}
				/>

				<FormHelperText
					error={isRequired.description}
				>{isRequired.description ? 'La descipcion es obligatorio' : ''}</FormHelperText>
			</FormControl>
		</div>
	</div>
)

export default Inputs;