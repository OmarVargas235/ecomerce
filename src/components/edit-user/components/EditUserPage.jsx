import React from 'react';

import InputsPage from './InputsPage';
import SocialMediaPage from './SocialMediaPage';
import { EditUserStyle } from '../style';

import { Divider } from '@material-ui/core';

const EditUserPage = ({ dataUser, desactiveBtn, editProfile, formRef, isRequired }) => (

	<EditUserStyle className="pt-4 text-center">
		<form onSubmit={editProfile}>
			
			<InputsPage
				dataUser={dataUser}
				formRef={formRef}
				isRequired={isRequired}
			/>
		
			<Divider light />

			<SocialMediaPage
				formRef={formRef}
			/>
		</form>
	</EditUserStyle>
)

export default EditUserPage;