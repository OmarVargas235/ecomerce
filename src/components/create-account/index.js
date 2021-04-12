import React from 'react';

import { styleMaterialUiTheme } from '../../utils/styleMaterialUi';
import CreateAccountPage from './CreateAccountPage';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: 200,
		},
		'& .MuiInputBase-root': {
			backgroundColor: '#F6F6F6',
		},
		'& .MuiFormLabel-root': {
			zIndex: 1,
			marginLeft: '1rem',
		},
	},
}));

const CreateAccount = () => {

	const classes = useStyles();
	const matches = useMediaQuery('(max-width: 576px)');

	const [ theme ] = styleMaterialUiTheme();
	
	return (
		<CreateAccountPage
			classes={classes}
			matches={matches}
			theme={theme}
		/>
	)
}

export default CreateAccount;