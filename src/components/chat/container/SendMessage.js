import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';

import SendMessagePage from '../components/SendMessagePage';
import { useForm } from '../../../customHooks/useForm';
import { callAPI } from '../helper';
import { useValidateForm } from '../../../customHooks/useValidateForm';
import { SocketContext } from '../../../context/SocketContext';
import { alert } from '../../../utils/alert';

const SendMessage = ({ dispatch, state }) => {

	const { selectedUserChat } = useSelector(state => state.messages);
	const { dataUser } = useSelector(state => state.user);

	const [ formData, handleChange ] = useForm({
		message: '',
	});

	const [, validate] = useValidateForm({ message: false });

	const { socket, online } = useContext( SocketContext );

	const [isFocus, setIsFocus] = useState(false);
	const [previewImages, setPreviewImages] = useState([]);
	// const [image, setImage] = useState(null);

	const handleChangeImg = e => {
		
		// Creamos el objeto de la clase FileReader
		const reader = new FileReader();

		// Leemos el archivo subido y se lo pasamos a nuestro fileReader
		reader.readAsDataURL(e.target.files[0]);
		// setImage(e.target.files[0]);
		
		// Le decimos que cuando este listo ejecute el código interno
		reader.onload = () => {

			setPreviewImages(state => [...state, reader.result]);
		}
	}

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
		
		const { isCursive, isBold } = state;
		const { message } = formData;
		const id = selectedUserChat.id || selectedUserChat['_id'];
		
		const { uid } = dataUser;

		// Obtener usuarios bloqueados
		const messagesRemitter = await callAPI(dispatch, `get-idBlockeds/${uid}`);
		const messagesReceptor = await callAPI(dispatch, `get-idBlockeds/${id}`);
		const isIncludesReceptor = messagesReceptor?.includes(uid);
		const isIncludesRemitter = messagesRemitter?.includes(id);
		
		// Si el usuario esta bloqueado, mostrar alerta y no enviar el mensaje.
		if (isIncludesReceptor || isIncludesRemitter) {
			
			return isIncludesRemitter
			? alert('warning', ['Haz bloqueado a este usuario'])
			: alert('warning', ['Este usuario te a bloqueado']);
		}

		if ( validate({ message }) ) return;

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
			};

			socket.emit('message-personal', obj);
		}
	}

	return (
		<SendMessagePage
			handleChange={handleChange}
			handleChangeImg={handleChangeImg}
			isFocus={isFocus}
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