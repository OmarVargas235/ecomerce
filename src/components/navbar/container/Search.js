import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SearchPage from '../components/SearchPage';
import { productsSearchActions } from '../../../redux/actions/productActions';
import { useForm } from '../../../customHooks/useForm';
import { requestWithoutToken } from '../../../utils/fetch';
import { alert } from '../../../utils/alert';

const Search = ({ setActiveSearch }) => {

	const dispatch = useDispatch();

	const history = useHistory();

	const [animationEnter, setAnimationEnter] = useState(true);

	const [ formData, handleChange ] = useForm({
		search: '',
	});

	const closeInputSearch = () => {

		setTimeout(() => setActiveSearch(false), 500);
		setAnimationEnter(false);
	}

	const search = async e => {
		
		if (e.key !== 'Enter' && e.key !== undefined) return;
		
		const { search } = formData;

		if (search.trim() === '') return;

		const { ok, messages } = await requestWithoutToken('search-product', formData, 'POST');

		if (ok) {
			
			history.push('/products-search');
			dispatch( productsSearchActions(messages) );
		
		} else alert('error', messages);
	}
	
	return (
		<SearchPage
			animationEnter={animationEnter}
			closeInputSearch={closeInputSearch}
			handleChange={handleChange}
			search={search}
		/>
	)
}

export default Search;