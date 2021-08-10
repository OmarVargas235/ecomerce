import React from 'react';
import { useHistory } from 'react-router-dom';

import CardAdminPage from '../components/CardAdminPage';

const CardAdmin = ({ addOrDeleteProduct=()=>{}, delateProduct, isAdd=false, message="", product, point }) => {

	const history = useHistory();

	const handleClick = () => {
		
		const id = product['_id'];
		
		message === 'editar producto'
		? history.push(`/editar-producto/${id}`)
		: delateProduct(id);
	}
	
	return (
		<CardAdminPage
			addOrDeleteProduct={addOrDeleteProduct}
			handleClick={handleClick}
			isAdd={isAdd}
			message={message}
			product={product}
			point={point}
		/>
	)
}

export default CardAdmin;