import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditImgProfilePage from './EditImgProfilePage';
import ControlPanel from '../../layaut/ControlPanel';
import { requestWithToken } from '../../utils/fetch';
import { alert } from '../../utils/alert';
import { useUploadForm } from '../../customHooks/useUploadForm';
import { getUserAction, logoutUser } from '../../redux/actions/userAction';

const EditImgProfile = () => {
	
	const dispatch = useDispatch();
	const { auth, dataUser } = useSelector(state => state.user);

	const [previewImages, handleChangeImg, image] = useUploadForm();

	const [desactiveBtn, setDesactiveBtn] = useState(false);

	const uploadImage = async () => {
		
		const token = auth.token;
		const id = dataUser.uid;

		if (!image) return alert('error', ['No se a seleccionado ninguna imagen']);

		setDesactiveBtn(true);
		alert('warning', ['Cargando imagen'], 1000000);
		
		const formData = new FormData();
		formData.append('image', image);
		formData.append('idUser', id);

		const { ok, messages, isExpiredToken } = await requestWithToken('upload-img', token, formData, 'POST');
		
		// Si el token ya a expirado se deslogea
		if (isExpiredToken) {
			
			dispatch( logoutUser() );
			alert('error', messages);
			
			return;
		}

		dispatch( getUserAction(token) );

		if (ok) {

			alert(ok ? 'success' : 'error', messages);
			setDesactiveBtn(false);
		}
	}
	
	return (
		<ControlPanel
			component={() => <EditImgProfilePage
				handleChange={handleChangeImg}
				previewImage={previewImages}
			/>}
			title="Fotografía"
			text="Añade una foto tuya al perfil."
			textButton="Guardar"
			photograph={true}
			handleClick={uploadImage}
			desactiveBtn={desactiveBtn}
		/>
	)
}

export default EditImgProfile;