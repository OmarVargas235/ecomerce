import React from 'react';
import { useSelector } from 'react-redux';

import AdminPage from './components/AdminPage';

const Admin = ({ history }) => {

	const { dataUser:{role} } = useSelector(state => state.user);
	
	return (
		<AdminPage
			history={history}
			role={role}
		/>
	)
}

export default Admin;