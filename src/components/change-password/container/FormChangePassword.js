import React, { useState } from 'react';

import FormChangePasswordPage from '../components/FormChangePasswordPage';
import { styleMaterialUiTheme } from '../../../utils/styleMaterialUi';
import { useShowMessage } from '../../../customHooks/useShowMessage';
import { useValidateForm } from '../../../customHooks/useValidateForm';
import { useForm } from '../../../customHooks/useForm';
import { requestWithoutToken } from '../../../utils/fetch';
import { alert } from '../../../utils/alert';

const FormChangePassword = ({ history }) => {
	
	const theme = styleMaterialUiTheme();

	// Obteniendo el token de la url
	const getToken = history.location.pathname.split('/')[2];

	const [ formData, handleChange ] = useForm({
		password: '',
		repeatPassword: '',
	});

	const [required, validate] = useValidateForm({
		password: false,
		repeatPassword: false,
	});

	const [isRequired, setIsRequired] = useState({});

	useShowMessage(history, `expired-form/${getToken}`);

	const changePassword = async e => {

		e.preventDefault();

		const { password, repeatPassword } = formData;

		// Validaciones en el frontend
		setIsRequired(required);

		if ( validate({ password, repeatPassword }) ) return;

		// Enviando la data del formulario al backend
		const { ok, messages } = await requestWithoutToken(`reset-password/${getToken}`, formData, 'POST');

		alert(ok ? 'success' : 'error', messages);

		if (ok) history.replace('/iniciar-sesion');
	}

	return (
		<FormChangePasswordPage
			changePassword={changePassword}
			handleChange={handleChange}
			isRequired={isRequired}
			theme={theme}
		/>
	)
}

export default FormChangePassword;