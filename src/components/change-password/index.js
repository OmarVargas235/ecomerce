import React, { useState } from 'react';

import { useForm } from '../../customHooks/useForm';
import { useValidateForm } from '../../customHooks/useValidateForm';
import { requestWithoutToken } from '../../utils/fetch';
import { alert } from '../../utils/alert';

import { styleMaterialUiTheme } from '../../utils/styleMaterialUi';
import ChangePasswordPage from './components/ChangePasswordPage';

const getLS = JSON.parse(window.localStorage.getItem('change-password-checked')) || {checked: false};

const ChangePassword = ({ history }) => {

	const [ theme ] = styleMaterialUiTheme();

	const [ formData, handleChange, desactiveBtn, setDesactiveBtn ] = useForm({
		email: getLS.checked ? getLS.email : '',
	});

	const [required, validate] = useValidateForm({
		email: false,
	});

	const [isRequired, setIsRequired] = useState({});

	const [checked, setChecked] = useState(getLS.checked);

	const changPassword = async e => {
		
		e.preventDefault();

		const { email } = formData;

		setIsRequired(required);

		if ( validate({ email }) ) return;

		if (checked) window.localStorage.setItem('change-password-checked', JSON.stringify({checked, email}));
		else window.localStorage.removeItem('change-password-checked');

		const { ok, messages } = await requestWithoutToken(`send-email-password/${email}`, formData, 'POST');

		alert(ok ? 'success' : 'error', messages);

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
			history={history}
			isRequired={isRequired}
			setChecked={setChecked}
			theme={theme}
		/>
	)
}

export default ChangePassword;