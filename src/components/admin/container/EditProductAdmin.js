import React from 'react';

import SelecterProduct from '../components/SelecterProduct';
import { useSelecter } from '../useSelecter';

import Container from '@material-ui/core/Container';

const EditProductAdmin = () => {

	const [ handleChange, dataSelected, point ] = useSelecter();

	return (
		<Container maxWidth="sm" className="my-5">
			<SelecterProduct
				dataSelected={dataSelected}
				handleChange={handleChange}
				message="editar producto"
				point={point}
				title="Editar producto"
			/>
		</Container>
	)
}

export default EditProductAdmin;