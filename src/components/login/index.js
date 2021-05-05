import React, { useState } from 'react';

import LoginPage from './LoginPage';
import { useForm } from '../../customHooks/useForm';
import { useValidateForm } from '../../customHooks/useValidateForm';
import { requestWithoutToken } from '../../utils/fetch';
import { alert } from '../../utils/alert';

import { styleMaterialUiTheme } from '../../utils/styleMaterialUi';

const getLS = JSON.parse(window.localStorage.getItem('email-ecomerce')) || '';

const Login = ({ history }) => {

  	const [ theme ] = styleMaterialUiTheme();

  	const [ formData, handleChange, desactiveBtn, setDesactiveBtn ] = useForm({
		email: getLS ? getLS.email : '',
		password: '',
	});

	const [required, validate] = useValidateForm({
		email: false,
		password: false,
	});

	const [isRequired, setIsRequired] = useState({});
	const [checked, setChecked] = useState(getLS ? getLS.checked : false);

	const login = async e => {
		
		e.preventDefault();

		const { email, password } = formData;

		setIsRequired(required);

		if ( validate({ email, password }) ) return;

		if (checked) window.localStorage.setItem('email-ecomerce', JSON.stringify({email, checked}));
		else window.localStorage.removeItem('email-ecomerce');
		
		const data = await requestWithoutToken('login-user', formData, 'POST');
		const { ok, messages, dataUser, token } = data;

		alert(ok ? 'success' : 'error', messages);

		if (ok) history.push('/iniciar-sesion');

		setDesactiveBtn(!ok ? true : false);
		setTimeout(() => setDesactiveBtn(false), 3000);
	}
	
	return (
		<LoginPage
			checked={checked}
			desactiveBtn={desactiveBtn}
			formData={formData}
			history={history}
			handleChange={handleChange}
			isRequired={isRequired}
			login={login}
			setChecked={setChecked}
			theme={theme}
		/>
	)
}

export default Login;