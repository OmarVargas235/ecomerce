import React, { useState } from 'react';

import ControlPanel from '../../layaut/ControlPanel';
import CreateProductPage from './CreateProductPage';

const CreateProduct = () => {
	
	 const [checked, setChecked] = useState({
		checkedA: true,
		checkedB: true,
		checkedC: true,
		checkedD: true,
		checkedF: true,
		checkedG: true,
	});

	const handleChecked = (event) => {

    	setChecked({ ...checked, [event.target.name]: event.target.checked });
  	};
	
	return (
		<ControlPanel
			component={() => <CreateProductPage checked={checked} handleChecked={handleChecked} />}
			title="Crear producto"
			text="Crea el producto llenando todos los campos aqui"
		/>
	)
}

export default CreateProduct;