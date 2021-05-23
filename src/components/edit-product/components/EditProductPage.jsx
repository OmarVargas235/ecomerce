import React from 'react';

import { EditProductStyle } from '../style';
import { TealButton } from '../../../utils/styleMaterialUi';
import Inputs from './Inputs';
import Categories from './Categories';
import Spinner from '../../../layaut/Spinner';

import { Divider } from '@material-ui/core';

const EditProductPage = ({ categories, editProduct, formRef, isRequired, loading, product }) => (
	<EditProductStyle className="pt-4 text-center">
		{
			loading ? <Spinner />
			: <form onSubmit={editProduct}>
				<Inputs
					formRef={formRef}
					isRequired={isRequired}
					product={product}
				/>

				<Divider light />

				<Categories
					categories={categories}
				/>

				<Divider light />

				<div className="mt-3 px-4 mr-5 text-right">
					<TealButton
						variant="contained"
						type="submit"
					>Editar producto</TealButton>
				</div>
			</form>
		}
	</EditProductStyle>
)

export default EditProductPage;