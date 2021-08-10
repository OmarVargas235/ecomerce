import { useState } from 'react';

import { useFetch } from '../../customHooks/useFetch';

export const useSelecterProduct = () => {

	const { data } = useFetch('get-all-products');

	const [product, setProduct] = useState({});
	const [point, setPoint] = useState(0);
	
	// Seleccionar un producto en el 'selecter' y obtner su calificacion promedio
	const handleChange = (select) => {
		
		if (select === '') return;

		const findProduct = data.find(product => product['_id'] === select);

		const { ratingsProduct } = findProduct;

		// Obetner la suma de todas las calificaciones dadas por los diferentes usuarios
		const totalQualification = ratingsProduct.reduce((acc, el) => {
			
			return (acc += Number(el.qualification), acc);

		}, 0);
		
		const qualification = Math.round(totalQualification / ratingsProduct.length);

		setProduct(findProduct);
		setPoint(qualification);
	}
	
	return [
		handleChange,
		product,
		point,
	];
}