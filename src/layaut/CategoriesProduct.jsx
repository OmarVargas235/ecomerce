import React, { useState } from 'react';

import { TealCheckbox } from '../utils/styleMaterialUi';

import { FormGroup, FormControlLabel } from '@material-ui/core';

const CategoriesProduct = ({ categories }) => {

	const [checked, setChecked] = useState({
		checkedA: false,
		checkedB: false,
		checkedC: false,
		checkedD: false,
		checkedF: false,
		checkedG: false,
	});

	const handleChecked = (event) => {
		
		const text = event.target.parentElement.parentElement.parentElement.lastChild;
		
		categories.has(text.textContent)
		? categories.delete(text.textContent)
		: categories.add(text.textContent);
		
    	setChecked({ ...checked, [event.target.name]: event.target.checked });
  	};

	return (
		<div className="py-4 px-5 mx-4 text-center">
			<h5>Escoje las categorias del producto</h5>
			
			<FormGroup>
				<FormControlLabel
					label="Juegos PC"
					labelPlacement="end"
					control={<TealCheckbox
						name="checkedA"
						onChange={handleChecked}
						checked={categories.has("Juegos PC")}
					/>}
				/>

				<FormControlLabel
					label="Juegos Moviles"
					labelPlacement="end"
					control={<TealCheckbox
						name="checkedB"
						onChange={handleChecked}
						checked={categories.has("Juegos Moviles")}
					/>}
				/>

				<FormControlLabel
					label="Accesorios"
					labelPlacement="end"
					control={<TealCheckbox
						name="checkedC"
						onChange={handleChecked}
						checked={categories.has("Accesorios")}
					/>}
				/>

				<FormControlLabel
					label="Juegos de consolas"
					labelPlacement="end"
					control={<TealCheckbox
						name="checkedD"
						onChange={handleChecked}
						checked={categories.has("Juegos de consolas")}
					/>}
				/>

				<FormControlLabel
					label="Componentes"
					labelPlacement="end"
					control={<TealCheckbox
						name="checkedF"
						onChange={handleChecked}
						checked={categories.has("Componentes")}
					/>}
				/>

				<FormControlLabel
					label="Decoracion"
					labelPlacement="end"
					control={<TealCheckbox
						name="checkedG"
						onChange={handleChecked}
						checked={categories.has("Decoracion")}
					/>}
				/>
			</FormGroup>
		</div>
	)
}

export default CategoriesProduct;