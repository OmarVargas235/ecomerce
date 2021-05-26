import React from 'react';

import InputsProduct from '../../layaut/InputsProduct';
import CategoriesProduct from '../../layaut/CategoriesProduct';

import { Divider } from '@material-ui/core';

const CreateProductPage = ({ categories, formRef, isRequired }) => (
	<form>
		
		<InputsProduct
			formRef={formRef}
			isRequired={isRequired}
		/>

		<Divider light />

		<CategoriesProduct
			categories={categories}
		/>
	</form>
)

export default CreateProductPage;