import React from 'react';

import { Input, TextareaAutosize, FormControl, FormHelperText } from '@material-ui/core';

const InputsProduct = ({ formRef, isRequired, product }) => (
	<div className="py-4 px-5 text-center">
		<div className="px-4">
			<FormControl className="w-100 mb-3">
				<Input
					disableUnderline
					placeholder="Nombre del producto"
					name="name"
					type="text"
					ref={formRef.name}
					defaultValue={product ? product.name : formRef.name.current?.firstChild.value}
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
					defaultValue={product ? product.price : formRef.price.current?.firstChild.value}
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
					defaultValue={product ? product.stock : formRef.stock.current?.firstChild.value}
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
				>{isRequired.images ? 'Debe de seleccionar al menos una imagen y menos de 6 imagenes' : ''}</FormHelperText>
			</FormControl>
			
			<FormControl className="w-100">
				<TextareaAutosize
					className="pl-3 pt-3"
					rowsMin={5}
					placeholder="Descripcion del producto"
					name="description"
					ref={formRef.description}
					defaultValue={product ? product.description : formRef.description.current?.value}
				/>

				<FormHelperText
					error={isRequired.description}
				>{isRequired.description ? 'La descipcion es obligatorio' : ''}</FormHelperText>
			</FormControl>
		</div>
	</div>
)

export default InputsProduct;