import React from 'react';
import { useHistory } from 'react-router-dom';

import CardAdminPage from '../components/CardAdminPage';

const CardAdmin = ({ addOrDeleteProduct, dataSelected, delateProduct, isAdd, message, point }) => {

	const history = useHistory();
	
	// Eliminar o editar producto
	const handleClick = () => {
		
		const id = dataSelected['_id'];
		
		message === 'editar producto'
		? history.push(`/editar-producto/${id}`)
		: delateProduct(id, dataSelected);
	}
	
	return (
		<CardAdminPage
			addOrDeleteProduct={addOrDeleteProduct}
			dataSelected={dataSelected}
			handleClick={handleClick}
			isAdd={isAdd}
			message={message}
			point={point}
		/>
	)
}

export default CardAdmin;