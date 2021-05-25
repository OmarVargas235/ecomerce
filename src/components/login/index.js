import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { getUserAction, loginAction } from '../../redux/actions/userAction';
import LoginPage from './LoginPage';
import { useForm } from '../../customHooks/useForm';
import { useValidateForm } from '../../customHooks/useValidateForm';
import { requestWithoutToken } from '../../utils/fetch';
import { alert } from '../../utils/alert';
import { useShowMessage } from '../../customHooks/useShowMessage';

import { styleMaterialUiTheme } from '../../utils/styleMaterialUi';

const Login = ({ history }) => {

	const getLS = JSON.parse(window.localStorage.getItem('email-ecomerce')) || '';
	
  	const theme = styleMaterialUiTheme();

  	const dispatch = useDispatch();

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

	// Mostrar mensaje de cuenta activada o de si el token del formulario de cambiar contraseña a expirado.
	useShowMessage(history, 'get-message');

	const login = async e => {
		
		e.preventDefault();

		const { email, password } = formData;

		// Validaciones en el frontend
		setIsRequired(required);

		if ( validate({ email, password }) ) return;

		// Guardar en el localStorage
		if (checked) window.localStorage.setItem('email-ecomerce', JSON.stringify({email, checked}));
		else window.localStorage.removeItem('email-ecomerce');
		
		// Enviando la data del formulario al backend
		const data = await requestWithoutToken('login-user', formData, 'POST');
		const { ok, messages, token } = data;

		alert(ok ? 'success' : 'error', messages);

		if (ok) {

			window.localStorage.setItem( 'token', token );
			history.push('/');

			dispatch( getUserAction() );
			dispatch( loginAction(token) );

			return;
		}

		// Desactivando el boton y luego activandolo cuando se quite la alerta
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