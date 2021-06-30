import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

const SearchMessagePage = ({ dispatch }) => (
	<div className="d-flex mr-3 mr-md-4">
		<input
			placeholder="Buscar"
			className="search pl-3 w-100"
			type="text"
			onChange={e => dispatch({type: 'SEARCH', payload: e.target.value})}
		/>

		<div
			className="container-icon-search d-flex justify-content-center align-items-center"
		> <SearchIcon />
		</div>
	</div>
)

export default SearchMessagePage;