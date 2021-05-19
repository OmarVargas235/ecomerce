import { useState } from 'react';

export const useFormNotController = (initialState ={}) => {
	
	const [values] = useState( initialState );
	const [desactiveBtn, setDesactiveBtn] = useState(false);

	const getDataRef = () => {
		
		const data = {};

		for (let x in values) {
			
			if (x === 'img') data[x] = values[x].current.firstChild.files;
			else if (x === 'description') data[x] = values[x].current.value;
			else data[x] = values[x].current.firstChild.value;
		}
		
		return data;
	}

	return [values, getDataRef, desactiveBtn, setDesactiveBtn];
}