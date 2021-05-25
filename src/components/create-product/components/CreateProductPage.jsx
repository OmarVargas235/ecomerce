import React from 'react';

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
	</form>
)

export default CreateProductPage;