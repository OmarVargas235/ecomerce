import React from 'react';

import InputsPage from './InputsPage';
import SocialMediaPage from './SocialMediaPage';
import { TealButton } from '../../../utils/styleMaterialUi';
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

			<Divider light />

			<div className="mt-3 px-4 mr-5 text-right">
				<TealButton
					variant="contained"
					type="submit"
					disabled={desactiveBtn}
				>guardar cambios</TealButton>
			</div>
		</form>
	</EditUserStyle>
)

export default EditUserPage;