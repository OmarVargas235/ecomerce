import React, { useState } from 'react';

import { useForm } from '../../customHooks/useForm';
import { useValidateForm } from '../../customHooks/useValidateForm';
import { requestWithoutToken } from '../../utils/fetch';
import { alert } from '../../utils/alert';

import { styleMaterialUiTheme } from '../../utils/styleMaterialUi';
import ChangePasswordPage from './ChangePasswordPage';

const getLS = JSON.parse(window.localStorage.getItem('email-ecomerce')) || '';
const getLSChecked = Boolean(window.localStorage.getItem('change-password-checked')) || false;

const ChangePassword = () => {

	const [ theme ] = styleMaterialUiTheme();

	const [ formData, handleChange, desactiveBtn, setDesactiveBtn ] = useForm({
		email: getLSChecked ? getLS.email : '',
	});

	const [required, validate] = useValidateForm({
		email: false,
	});

	const [isRequired, setIsRequired] = useState({});

	const [checked, setChecked] = useState(getLSChecked);

	const changPassword = async e => {
		
		e.preventDefault();

		// omravaja@hotmail.com

		const { email } = formData;

		setIsRequired(required);

		if ( validate({ email }) ) return;

		if (checked) window.localStorage.setItem('change-password-checked', checked);
		else window.localStorage.removeItem('change-password-checked');

		const { ok, messages } = await requestWithoutToken('reset-password', formData, 'POST', email);
		// const { ok, messages, dataUser, token } = data;
		console.log(ok, messages)

		alert(ok ? 'success' : 'error', messages);

		// if (ok) history.push('/iniciar-sesion');

		setDesactiveBtn(!ok ? true : false);
		setTimeout(() => setDesactiveBtn(false), 3000);
	}
	
	return (
		<ChangePasswordPage
			checked={checked}
			changPassword={changPassword}
			desactiveBtn={desactiveBtn}
			formData={formData}
			handleChange={handleChange}
			isRequired={isRequired}
			setChecked={setChecked}
			theme={theme}
		/>
	)
}

export default ChangePassword;