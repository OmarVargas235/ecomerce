import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SendMessagePage from '../components/SendMessagePage';
import { useForm } from '../../../customHooks/useForm';
import { callAPI } from '../helper';
import { useValidateForm } from '../../../customHooks/useValidateForm';
import { SocketContext } from '../../../context/SocketContext';
import { alert } from '../../../utils/alert';
import { requestWithToken } from '../../../utils/fetch';
import { useUploadForm } from '../../../customHooks/useUploadForm';
import { logoutUser } from '../../../redux/actions/userAction';

const SendMessage = ({ dispatch, state }) => {

	const { selectedUserChat } = useSelector(state => state.messages);
	const { dataUser } = useSelector(state => state.user);
	const dispatchRedux = useDispatch();

	const [ formData, handleChange ] = useForm({
		message: '',
	});
	const [, validate] = useValidateForm({ message: false });
	const [previewImages, handleChangeImg, , images] = useUploadForm([]);

	const { socket, online } = useContext( SocketContext );

	const [isFocus, setIsFocus] = useState(false);

	/* Seleccionar opciones del chat: negrita la letra o cursiva*/
	const selectedOption = async text => {

		const { isBold, isCursive } = state;

		if (text === 'bold' && !isBold) dispatch({ type: 'IS_BOLD', payload: true });
		else if (text === 'bold' && isBold) dispatch({ type:'IS_BOLD', payload: false });
		
		if (text ==='cursive' && !isCursive) dispatch({type: 'IS_CURSIVE',payload:true});
		else if (text === 'cursive' && isCursive)
			dispatch({type: 'IS_CURSIVE', payload: false});
	}

	const writeMessage = async e => {

		e.preventDefault();
		
		let { message } = formData;
		const token = window.localStorage.getItem('token');
		const { isCursive, isBold } = state;
		const id = selectedUserChat.id || selectedUserChat['_id'];
		
		const { uid } = dataUser;

		// Obtener usuarios bloqueados
		const messagesRemitter = await callAPI(dispatch, `get-idBlockeds/${uid}`);
		const messagesReceptor = await callAPI(dispatch, `get-idBlockeds/${id}`);
		const isIncludesRemitter = messagesRemitter?.includes(id);
		const isIncludesReceptor = messagesReceptor?.includes(uid);
		
		// Si el usuario esta bloqueado, mostrar alerta y no enviar el mensaje.
		if (isIncludesRemitter || isIncludesReceptor) {
			
			return isIncludesRemitter
			? alert('warning', ['Haz bloqueado a este usuario'])
			: alert('warning', ['Este usuario te a bloqueado']);
		}

		const extensiones = images.map(file => file.name.split('.')[1] );
		const extensionsValid = {'png': true, 'jpg': true, 'jpeg': true, 'webp': true};
		const isValidateExtension = extensiones.some(extension => extensionsValid[extension] === undefined);
			
		if (isValidateExtension)
			return alert('error', [`Las extensiones permitidas son: png,jpg,jpeg,webp`]);
		if (images.length > 9)return alert('error', ['Solo se pueden enviar 9 imagenes']);
		if ( validate({ message }) && images.length === 0 ) return;

		(message === '' && images.length === 1) && (message = 'Se ha enviado una imagen');
		(message === '' && images.length > 1) && (message = 'Se han enviado imagenes');

		// Enviar mensaje
		if (online) {
			
			const obj = {
				of: uid,
				for: id,
				nameRemitter: dataUser.name + ' ' + dataUser.lastName,
				nameReceptor: selectedUserChat.name + ' ' + selectedUserChat.lastName,
				message,
				isBold,
				isCursive,
				viewMessageOf: true,
				viewMessageFor: true,
				token,
			};

			socket.emit('message-personal', obj, async resp => {

				const formData = new FormData();
				images.forEach(img => formData.append('images', img) );
				formData.append('id', resp['_id']);

				const { ok, messages, isExpiredToken } = await requestWithToken('upload-images', token, formData, 'POST');

				// Si el token ya a expirado se deslogea
				if (isExpiredToken) {
					
					dispatchRedux( logoutUser() );
					alert('error', messages);
				}

				if (!ok) return alert('error', messages);
			});
		}
	}

	return (
		<SendMessagePage
			handleChange={handleChange}
			handleChangeImg={handleChangeImg}
			isFocus={isFocus}
			images={images}
			previewImages={previewImages}
			state={state}
			selectedOption={selectedOption}
			setIsFocus={setIsFocus}
			text={formData.message}
			writeMessage={writeMessage}
		/>
	)
}

export default SendMessage;

// ¡Hola! Muchas gracias por inscribirte a este curso que estoy seguro que será de tu agrado. Cualquier duda que tengas estoy disponible mediante el panel de preguntas y respuestas para ayudarte.