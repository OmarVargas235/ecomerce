import React from 'react';

import SelectionMenu from '../../../layaut/SelectionMenu';
import Spinner from '../../../layaut/Spinner';
import { useFetch } from '../../../customHooks/useFetch';

import CardAdmin from '../container/CardAdmin';

import { Container } from '@material-ui/core';

const SelecterProduct = ({ addOrDeleteProduct, delateProduct, handleChange, isAdd, message, product, point }) => {

	const { data, loading } = useFetch('get-all-products');
	
	return (
		<Container maxWidth="sm" className="my-5">
			{
				loading ? <Spinner />
				: <React.Fragment>
					<SelectionMenu
						categorys={data.map(product => product.name)}
						value={data.map(product => product['_id'])}
						title="Seleccionar un producto"
						setChange={handleChange}
					/>
					
					{
						!product.name ? null
						: <CardAdmin
							addOrDeleteProduct={addOrDeleteProduct}
							delateProduct={delateProduct}
							isAdd={isAdd}
							message={message}
							product={product}
							point={point}
						/>
					}
				</React.Fragment>
			}
		</Container>
	)
}

export default SelecterProduct;