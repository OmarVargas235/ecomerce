import React from 'react';

import { SearchContainer } from '../style';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import { ReactComponent as Close } from '../../../assets/icons/close.svg';

const SearchPage = ({ animationEnter, closeInputSearch }) => (
	<SearchContainer className="d-flex align-items-center" animationEnter={animationEnter}>
		<Grid container spacing={1} alignItems="flex-end" className="justify-content-center mx-0">
			<Grid item xs={8}>
				<TextField
					id="input-with-icon-grid"
					label="Search our store"
					className="w-100"
					color="secondary"
				/>
			</Grid>

			<Grid item>
				<div className="container-icon-search d-flex justify-content-center align-items-center">
					<SearchIcon />
				</div>
			</Grid>

			<Grid item>
				<div className="container-icon-close d-flex justify-content-center align-items-center">
					<Close 
						className="pointer"
						onClick={closeInputSearch}
					/>
				</div>
			</Grid>
		</Grid>
	</SearchContainer>
);

export default SearchPage;