import React from 'react';

import { EditProductStyle, MapStyle } from './style';
import InputsProduct from '../../layaut/InputsProduct';
import CategoriesProduct from '../../layaut/CategoriesProduct';
import Spinner from '../../layaut/Spinner';

import { Divider } from '@material-ui/core';

const EditProductPage = ({ categories, formRef, isRequired, loading, mapRef, product }) => (
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

				{
					product.location?.length === 0 ? null
					: <MapStyle className="px-4">
						<div ref={mapRef} className="w-100 map"></div>
					</MapStyle>
				}
			</form>
		}
	</EditProductStyle>
)

export default EditProductPage;