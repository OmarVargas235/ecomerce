import React from 'react';

import InfoUser from '../../layaut/InfoUser';
import EditUserPage from './EditUserPage';

const EditUser = () => {

	return (
		<InfoUser
			component={EditUserPage}
			title="Editar tu perfil"
			text="Edita los datos que creas correspondientes aqui"
		/>
	)
}

export default EditUser;