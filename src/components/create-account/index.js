import React from 'react';
import CreateAccountPage from './CreateAccountPage';

import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: 200,
		},
	},
}));

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

const CreateAccount = () => {

	const classes = useStyles();
	const matches = useMediaQuery('(max-width: 576px)');
	
	return (
		<CreateAccountPage
			classes={classes}
			matches={matches}
			theme={theme}
		/>
	)
}

export default CreateAccount;