import React from 'react';
import LoginPage from './LoginPage';

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#E12727',
    },
    secondary: {
      main: '#212121',
    },
  },
});

const Login = () => {
	
	return (
		<LoginPage
			theme={theme}
		/>
	)
}

export default Login;