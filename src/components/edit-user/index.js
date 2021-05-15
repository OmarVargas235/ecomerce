import React from 'react';

import ControlPanel from '../../layaut/ControlPanel';
import EditUserPage from './EditUserPage';

const EditUser = () => {

	return (
		<ControlPanel
			component={EditUserPage}
			title="Editar tu perfil"
			text="Edita los datos que creas correspondientes aqui"
		/>
	)
}

export default EditUser;