import React from 'react';

import { styleMaterialUiTheme } from '../utils/styleMaterialUi';

import CircularProgress from '@material-ui/core/CircularProgress';
import { ThemeProvider } from '@material-ui/core/styles';

function Spinner() {

	const theme = styleMaterialUiTheme();

  	return (
  		<div className="mt-5 w-100 text-center">
  			<ThemeProvider theme={theme}>
  				<CircularProgress color="secondary" />
  			</ThemeProvider>
  		</div>
	);
}

export default Spinner;