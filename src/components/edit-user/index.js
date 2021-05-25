import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import ControlPanel from '../../layaut/ControlPanel';
import EditUserPage from './components/EditUserPage';

// import { getProductActions } from '../../redux/actions/productActions';
import { useFormNotController } from '../../customHooks/useFormNotController';
import { useValidateForm } from '../../customHooks/useValidateForm';
import { alert } from '../../utils/alert';
import { requestWithToken } from '../../utils/fetch';

const EditUser = () => {

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
		
		const socialMedias = [
			webPage, `http://twitter.com/${twitter}`,
			`http://www.facebook.com/${facebook}`,
			`https://www.instagram.com/${instagram}`,
			`http://www.youtube.com/${youtube}`
		];
		const formData = new FormData();
		formData.append('id', dataUser.uid);
		formData.append('name', formDataRef.name);
		formData.append('lastName', formDataRef.lastName);
		formData.append('description', formDataRef.description);
		formData.append('socialMedias', socialMedias);
		
		const { ok, messages } = await requestWithToken('edit-user', token, formData, 'POST');

		alert(ok ? 'success' : 'error', messages);

		// if (ok) return history.push('/mis-productos');
		
		// Desactivando el boton y luego activandolo cuando se quite la alerta
		setDesactiveBtn(true);
		setTimeout(() => setDesactiveBtn(false), 3000);
  	}

	return (
		<ControlPanel
			component={() => <EditUserPage
				dataUser={dataUser}
				desactiveBtn={desactiveBtn}
				editProfile={editProfile}
				formRef={formRef}
				isRequired={isRequired}
			/>}
			title="Editar tu perfil"
			text="Edita los datos que creas correspondientes aqui"
			textButton="guardar cambios"
		/>
	)
}

export default EditUser;