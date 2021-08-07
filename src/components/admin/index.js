import React from 'react';
import { useSelector } from 'react-redux';

import AdminPage from './components/AdminPage';

const Admin = ({ history }) => {

	const { dataUser } = useSelector(state => state.user);
	
	return (
		<AdminPage
			history={history}
			role={dataUser.role}
		/>
	)
}

export default Admin;