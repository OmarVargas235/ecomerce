import React, { useState } from 'react';

import { alert } from '../../utils/alert'
import { styleMaterialUiTheme } from '../../utils/styleMaterialUi';
import CreateAccountPage from './components/CreateAccountPage';
import { useForm } from '../../customHooks/useForm';
import { useValidateForm } from '../../customHooks/useValidateForm';
import { requestWithoutToken } from '../../utils/fetch';

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

const CreateAccount = ({ history }) => {

	const classes = useStyles();
	const matches = useMediaQuery('(max-width: 576px)');

	const [ theme ] = styleMaterialUiTheme();

	const [ formData, handleChange, desactiveBtn, setDesactiveBtn ] = useForm({
		name: '',
		lastName: '',
		email: '',
		password: '',
		repeatPassword: '',
	});

	const [required, validate] = useValidateForm({
		name: false,
		lastName: false,
		email: false,
		password: false,
		repeatPassword: false,
	});

	const [isRequired, setIsRequired] = useState({});

	const registerUser = async e => {

		e.preventDefault();

		const { name, lastName, email, password, repeatPassword } = formData;

		setIsRequired(required);

		if ( validate({ name, lastName, email, password, repeatPassword }) ) return;
		
		const { ok, messages } = await requestWithoutToken('create-user', formData, 'POST');

		alert(ok ? 'success' : 'error', messages);

		if (ok) history.push('/iniciar-sesion');

		setDesactiveBtn(!ok ? true : false);
		setTimeout(() => setDesactiveBtn(false), 3000);
	}
	
	return (
		<CreateAccountPage
			classes={classes}
			desactiveBtn={desactiveBtn}
			formData={formData}
			handleChange={handleChange}
			isRequired={isRequired}
			matches={matches}
			registerUser={registerUser}
			theme={theme}
		/>
	)
}

export default CreateAccount;