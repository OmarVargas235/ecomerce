import { useMemo } from 'react';

export const useValidateForm = (initialState ={}) => {
	
	const required = useMemo(() => initialState, [initialState]);

	const validate = obj => {

		// Verifica si algun campo del formulario esta vacio.
		for (let x in required) required[x] = obj[x].trim() === '';

		// Si algun campo del formulario esta vacio retorna true y no se envia la data.
		for (let x in obj) {

			if (obj[x].trim() === '') return true;
		}

		return false;
	}

	return [required, validate];
}