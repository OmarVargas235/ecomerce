import React from 'react';

import SelecterProduct from '../components/SelecterProduct';
import { useSelecterProduct } from '../useSelecterProduct';
import { useFetch } from '../../../customHooks/useFetch';

import Container from '@material-ui/core/Container';

const DeleteProductAdmin = () => {

	const { data } = useFetch('get-all-products');
	const [ handleChange, product, point ] = useSelecterProduct(data);

	return (
		<Container maxWidth="sm" className="my-5">
			<SelecterProduct
				handleChange={handleChange}
				message="eliminar producto"
				product={product}
				point={point}
			/>
		</Container>
	)
}

export default DeleteProductAdmin;