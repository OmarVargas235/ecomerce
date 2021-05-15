import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ isAuthenticated, component:Component, setPath, ...rest }) => {

	return (
		<Route { ...rest }
			component={props => (
				( isAuthenticated )
				? <Component { ...props } setPath={setPath} />
				: <Redirect to="/iniciar-sesion" />
			)}
		/>
	)
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}

export default PrivateRoute;