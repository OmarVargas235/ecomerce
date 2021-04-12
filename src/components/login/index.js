import React from 'react';
import LoginPage from './LoginPage';

import { styleMaterialUiTheme } from '../../utils/styleMaterialUi';

const Login = () => {

  	const [ theme ] = styleMaterialUiTheme();
	
	return (
		<LoginPage
			theme={theme}
		/>
	)
}

export default Login;