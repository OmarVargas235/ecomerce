import React from 'react';

import ControlPanel from '../../layaut/ControlPanel';
import EditProductPage from './EditProductPage';

const EditProduct = () => {
	
	return (
		<ControlPanel
			component={EditProductPage}
			title="Editar producto"
			text="Edita los datos que creas correspondientes aqui"
		/>
	)
}

export default EditProduct;