import React from 'react';
import { useSelector } from 'react-redux';

import AdminPage from './AdminPage';

const Admin = () => {

	const { dataUser } = useSelector(state => state.user);
	
	return (
		<AdminPage
			role={dataUser.role}
		/>
	)
}

export default Admin;