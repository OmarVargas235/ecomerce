import React, { useState } from 'react';

import { alert } from '../../utils/alert'
import { styleMaterialUiTheme } from '../../utils/styleMaterialUi';
import CreateAccountPage from './components/CreateAccountPage';
import { useForm } from '../../customHooks/useForm';

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

	const [ formData, handleChange ] = useForm({
		name: '',
		lastName: '',
		email: '',
		password: '',
		repeatPassword: '',
	});

	const [isRquerid, setIsRquerid] = useState({});

	const registerUser = async e => {

		e.preventDefault();

		const { name, lastName, email, password, repeatPassword } = formData;

		setIsRquerid({ 
			isName: name.trim() === '',
			isLastName: lastName.trim() === '',
			isEmail: email.trim() === '',
			password: password.trim() === '',
			repeatPassword: repeatPassword.trim() === '',
		});

		if (name.trim() === '' || lastName.trim() === '' || email.trim() === '' || password.trim() === '' || repeatPassword.trim() === '') return;

		const resp = await fetch('http://localhost:5000/create-user', {
			method: 'POST',
			headers: {
		      'Content-Type':'application/json',
			},
			body: JSON.stringify(formData),
		});
		const { ok, messages } = await resp.json();

		alert(ok ? 'success' : 'error', messages);
	}
	
	return (
		<CreateAccountPage
			classes={classes}
			formData={formData}
			handleChange={handleChange}
			isRquerid={isRquerid}
			matches={matches}
			registerUser={registerUser}
			theme={theme}
		/>
	)
}

export default CreateAccount;