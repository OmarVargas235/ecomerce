import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditImgProfilePage from './EditImgProfilePage';
import ControlPanel from '../../layaut/ControlPanel';
import { requestWithToken } from '../../utils/fetch';
import { alert } from '../../utils/alert';
import { getUserAction } from '../../redux/actions/userAction';

const EditImgProfile = () => {
	
	const dispatch = useDispatch();
	const { auth, dataUser } = useSelector(state => state.user);

	const [previewImage, setPreviewImage] = useState('');
	const [image, setImage] = useState(null);

	const handleChange = e => {
		
		// Creamos el objeto de la clase FileReader
		const reader = new FileReader();

		// Leemos el archivo subido y se lo pasamos a nuestro fileReader
		reader.readAsDataURL(e.target.files[0]);
		setImage(e.target.files[0]);
		
		// Le decimos que cuando este listo ejecute el código interno
		reader.onload = () => setPreviewImage(reader.result);
	}

	const uploadImage = async () => {
		
		const token = auth.token;
		const id = dataUser.uid;

		if (!image) return alert('error', ['No se a seleccionado ninguna imagen']);
		
		const formData = new FormData();
		formData.append('image', image);
		formData.append('id', id);

		const { ok, messages } = await requestWithToken('upload-img', token, formData, 'POST');
		alert(ok ? 'success' : 'error', messages);

		dispatch( getUserAction(token) );
	}
	
	return (
		<ControlPanel
			component={() => <EditImgProfilePage
				handleChange={handleChange}
				previewImage={previewImage}
				uploadImage={uploadImage}
			/>}
			title="Fotografía"
			text="Añade una foto tuya al perfil."
			textButton="Guardar"
			photograph={true}
			handleClick={uploadImage}
		/>
	)
}

export default EditImgProfile;