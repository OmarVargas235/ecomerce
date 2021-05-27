import React from 'react';

import { SearchContainer } from '../style';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

const SearchPage = ({ animationEnter, closeInputSearch, handleChange, search }) => (
	<SearchContainer className="d-flex align-items-center" animationEnter={animationEnter}>
		<Grid container spacing={1} alignItems="flex-end" className="justify-content-center mx-0">
			<Grid item xs={8}>
				<TextField
					id="input-with-icon-grid"
					label="Search our store"
					className="w-100"
					color="secondary"
					name="search"
					onChange={handleChange}
					onKeyDown={search}
				/>
			</Grid>

			<Grid item>
				<div
					className="container-icon-search d-flex justify-content-center align-items-center"
					onClick={search}
				>
					<SearchIcon />
				</div>
			</Grid>

			<Grid item>
				<div className="container-icon-close d-flex justify-content-center align-items-center">
					<CloseIcon 
						className="pointer icon-close"
						onClick={closeInputSearch}
					/>
				</div>
			</Grid>
		</Grid>
	</SearchContainer>
);

export default SearchPage;