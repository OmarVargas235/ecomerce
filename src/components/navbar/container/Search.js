import React, { useState } from 'react';
import SearchPage from '../components/SearchPage';

const Search = ({ setActiveSearch }) => {

	const [animationEnter, setAnimationEnter] = useState(true);

	const closeInputSearch = () => {

		setTimeout(() => setActiveSearch(false), 500);
		setAnimationEnter(false);
	}
	
	return (
		<SearchPage
			animationEnter={animationEnter}
			closeInputSearch={closeInputSearch}
		/>
	)
}

export default Search;