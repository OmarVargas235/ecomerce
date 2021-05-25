import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

const SearchMessagePage = () => (
	<div className="d-flex mr-3 mr-md-4">
		<input
			placeholder="Buscar"
			className="search pl-3 w-100"
			type="text"
		/>

		<div className="container-icon-search d-flex justify-content-center align-items-center">
			<SearchIcon />
		</div>
	</div>
)

export default SearchMessagePage;