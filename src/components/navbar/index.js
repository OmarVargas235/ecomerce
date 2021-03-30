import React, { useState } from 'react';
import NavbarPage from './components/NavbarPage';

import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
	paper: {
		textAlign: 'center',
	},
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#E12727',
    },
    secondary: {
      main: '#212121',
    },
  },
});

const Navbar = () => {

	// Variables de material ui
	const classes = useStyles();
  	const [value, setValue] = useState(0);


  	const [activeSearch, setActiveSearch] = useState(false);

  	const handleChange = (event, newValue) => setValue(newValue);
	
	return (
		<NavbarPage 
			activeSearch={activeSearch}
			classes={classes}
			handleChange={handleChange}
			setActiveSearch={setActiveSearch}
			theme={theme}
			value={value}
		/>
	)
}

export default Navbar;