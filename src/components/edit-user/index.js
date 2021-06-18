import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ControlPanel from '../../layaut/ControlPanel';
import EditUserPage from './components/EditUserPage';

import { getUserAction, logoutUserAction } from '../../redux/actions/userAction';
import { useFormNotController } from '../../customHooks/useFormNotController';
import { useValidateForm } from '../../customHooks/useValidateForm';
import { alert } from '../../utils/alert';
import { requestWithToken } from '../../utils/fetch';

const EditUser = ({ history }) => {
	
	const dispatch = useDispatch();
	const { dataUser, auth } = useSelector(state => state.user);

	const [formRef, getDataRef, desactiveBtn, setDesactiveBtn] = useFormNotController({
		name: React.createRef(''),
		lastName: React.createRef(''),
		description: React.createRef(''),

		webPage: React.createRef(''),
		twitter: React.createRef(''),
		facebook: React.createRef(''),
		instagram: React.createRef(''),
		youtube: React.createRef(''),
	});

	const [required, validate] = useValidateForm({
		name: false,
		lastName: false,
	});
	const [isRequired, setIsRequired] = useState({});

	const editProfile = async e => {

		e.preventDefault();

		const formDataRef = getDataRef();
		const { description, facebook, instagram, twitter, webPage, youtube, ...data } = formDataRef;
		const token = auth.token;
		
		setIsRequired(required);

		if ( validate(data) ) return;
		
		const socialMedias = [ webPage, twitter, facebook, instagram, youtube];
		const formData = new FormData();
		formData.append('id', dataUser.uid);
		formData.append('name', formDataRef.name);
		formData.append('lastName', formDataRef.lastName);
		formData.append('description', formDataRef.description);
		formData.append('socialMedias', socialMedias);
		
		const { ok, messages, isExpiredToken } = await requestWithToken('edit-user', token, formData, 'POST');	
		
		if (isExpiredToken) {
			
			dispatch( logoutUserAction(dataUser.uid) );
			alert('error', messages);

			return;
		}

		alert(ok ? 'success' : 'error', messages);
		
		if (ok) {
			
			dispatch( getUserAction(token) );
			return history.push('/mi-perfil');
		}
		
		// Desactivando el boton y luego activandolo cuando se quite la alerta
		setDesactiveBtn(true);
		setTimeout(() => setDesactiveBtn(false), 3000);
  	}
	
	return (
		<ControlPanel
			component={() => <EditUserPage
				dataUser={dataUser}
				formRef={formRef}
				isRequired={isRequired}
			/>}
			title="Editar tu perfil"
			text="Edita los datos que creas correspondientes aqui"
			textButton="editar perfil"
			handleClick={editProfile}
			desactiveBtn={desactiveBtn}
		/>
	)
}

export default EditUser;