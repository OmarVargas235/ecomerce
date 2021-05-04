import { useState } from 'react';

export const useForm = (initialState ={}) => {
	
	const [values, setValues] = useState( initialState );
	const [desactiveBtn, setDesactiveBtn] = useState(false);

	const handleChange = e => {

		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	}

	return [values, handleChange, desactiveBtn, setDesactiveBtn];
}