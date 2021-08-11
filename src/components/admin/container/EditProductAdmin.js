import React from 'react';

import SelecterProduct from '../components/SelecterProduct';
import { useSelecter } from '../useSelecter';

const EditProductAdmin = () => {

	const [ handleChange, dataSelected, point ] = useSelecter();

	return (		
		<SelecterProduct
			dataSelected={dataSelected}
			handleChange={handleChange}
			message="editar producto"
			point={point}
			title="Editar producto"
		/>	
	)
}

export default EditProductAdmin;