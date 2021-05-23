import React from 'react';

import { styleMaterialUiTheme } from '../utils/styleMaterialUi';

import CircularProgress from '@material-ui/core/CircularProgress';
import { ThemeProvider } from '@material-ui/core/styles';

function Spinner() {

	const theme = styleMaterialUiTheme();

  	return (
  		<ThemeProvider theme={theme}>
			<CircularProgress color="secondary" className="mt-5" />
		</ThemeProvider>
	);
}

export default Spinner;