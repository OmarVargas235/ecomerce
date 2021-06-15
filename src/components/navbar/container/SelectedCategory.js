import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SelectionMenu from '../../../layaut/SelectionMenu';
import { productsSearchActions } from '../../../redux/actions/productActions';
import { categorys } from '../../../utils/helper';
import { requestWithoutToken } from '../../../utils/fetch';
import { alert } from '../../../utils/alert';

const SelectedCategory = () => {

	const dispatch = useDispatch();

	const history = useHistory();

	const selectedCategry = async selected => {

		const { ok, messages } = await requestWithoutToken('get-products-category', {selected}, 'POST');

		if (ok) {
			
			history.push('/products-search');
			dispatch( productsSearchActions(messages) );
		
		} else alert('error', messages);
	}
	
	return (
		<SelectionMenu
			title="Categorias"
			categorys={categorys}
			setChange={selectedCategry}
		/>
	)
}

export default SelectedCategory;