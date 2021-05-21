import React from 'react';

import { TealButton } from '../../../utils/styleMaterialUi';
import Inputs from './Inputs';
import Categories from './Categories';

import { Divider } from '@material-ui/core';

const CreateProductPage = ({ categories, createProduct, desactiveBtn, formRef, isRequired }) => (
	<form onSubmit={createProduct}>
		
		<Inputs
			formRef={formRef}
			isRequired={isRequired}
		/>

		<Divider light />

		<Categories
			categories={categories}
		/>

		<Divider light />

		<div className="mt-3 mr-3 text-right">
			<TealButton
				variant="contained"
				type="submit"
				disabled={desactiveBtn}
			>Crear Producto</TealButton>
		</div>
	</form>
)

export default CreateProductPage;