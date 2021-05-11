import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CreateAccount from '../components/create-account/';
import Login from '../components/login/';
import ChangePassword from '../components/change-password';
import FormChangePassword from '../components/change-password/container/FormChangePassword';

const DashboardRoutesPublic = () => (		
	<Switch>
		<Route exact path="/crear-cuenta" component={CreateAccount} />
		<Route exact path="/iniciar-sesion" component={Login} />
		<Route exact path="/cambiar-contraseña" component={ChangePassword} />
		<Route exact path="/formulario_cambiar_contraseña/:token" component={FormChangePassword} />

		<Redirect from="/" to="/iniciar-sesion" />
	</Switch>
)

export default DashboardRoutesPublic;