import React from 'react';

import { EditProductStyle } from './style';
import InputsProduct from '../../layaut/InputsProduct';
import CategoriesProduct from '../../layaut/CategoriesProduct';
import Spinner from '../../layaut/Spinner';

import { Divider } from '@material-ui/core';

const EditProductPage = ({ categories, formRef, isRequired, loading, product }) => (
	<EditProductStyle className="pt-4 text-center">
		{
			loading ? <Spinner />
			: <form>
				<InputsProduct
					formRef={formRef}
					isRequired={isRequired}
					product={product}
				/>

				<Divider light />

				<CategoriesProduct
					categories={categories}
				/>

				<Divider light />
			</form>
		}
	</EditProductStyle>
)

export default EditProductPage;