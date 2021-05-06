import React from 'react';

import { styleMaterialUiTheme } from '../../../utils/styleMaterialUi';
import FormChangePasswordPage from '../components/FormChangePasswordPage';

const FormChangePassword = () => {

	const [ theme ] = styleMaterialUiTheme();

	return (
		<FormChangePasswordPage
			theme={theme}
		/>
	)
}

export default FormChangePassword;