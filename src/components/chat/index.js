import React, { useState, useContext, useRef, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ChatPage from './components/ChatPage';
import { initialState, reducer } from './reducer';
import { useForm } from '../../customHooks/useForm';
import { useValidateForm } from '../../customHooks/useValidateForm';
import { SocketContext } from '../../context/SocketContext';
import {
	recordChatsAction,
} from '../../redux/actions/messagesAction';
import { alert } from '../../utils/alert';
import { callAPI } from './helper';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const Chat = () => {

	const { selectedUserChat } = useSelector(state => state.messages);
	const { dataUser } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const matchesContainerMessages = useMediaQuery('(max-width: 767px)');

	const [ formData, handleChange ] = useForm({
		message: '',
	});

	const [, validate] = useValidateForm({ message: false });

	const { socket, online } = useContext( SocketContext );

	const containerMesssageRef = useRef();

	const [state, dispatchState] = useReducer(reducer, initialState);

	const [selectedMessage, setSelectedMessage] = useState(!matchesContainerMessages);
	
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
	
	/* Seleccionar opciones del chat: negrita la letra o cursiva*/
	const selectedOption = async text => {

		const { isBold, isCursive } = state;

		if (text === 'bold' && !isBold) dispatchState({ type: 'IS_BOLD', payload: true });
		else if (text === 'bold' && isBold) dispatchState({ type:'IS_BOLD', payload: false });
		
		if (text ==='cursive' && !isCursive) dispatchState({type: 'IS_CURSIVE',payload:true});
		else if (text === 'cursive' && isCursive)
			dispatchState({type: 'IS_CURSIVE', payload: false});
	}

	// Seleccionar 'todos los mensajes' o solo los 'no leidos', cuando la resolucion de la pantalla es menor a 768px
	const selectedOptionResponsive = (text) => {

		const { chatsMemory } = state;

		if (text === 'Todos los mensajes') {
			
			dispatchState({ type: 'SHOW_MESSAGE_RESPONSIVE', payload: true });
			dispatch( recordChatsAction(chatsMemory) );
		
		} else if (text === 'Sin leer') {
			
			const chatsWithoutView = chatsMemory.filter(chat => chat.viewMessage);
			dispatchState({ type: 'SHOW_MESSAGE_RESPONSIVE', payload: true });
			dispatch( recordChatsAction(chatsWithoutView) );
		
		} else {

			dispatchState({ type: 'SHOW_MESSAGE_RESPONSIVE', payload: false });
		}
	}

	return (
		<ChatPage
			containerMesssageRef={containerMesssageRef}
			dataUser={dataUser}
			dispatch={dispatchState}
			handleChange={handleChange}
			matchesContainerMessages={matchesContainerMessages}
			state={state}
			selectedOption={selectedOption}
			selectedUserChat={selectedUserChat}
			selectedMessage={selectedMessage}
			selectedOptionResponsive={selectedOptionResponsive}
			setSelectedMessage={setSelectedMessage}
			writeMessage={writeMessage}
		/>
	)
}

export default Chat;

// ¡Hola! Muchas gracias por inscribirte a este curso que estoy seguro que será de tu agrado. Cualquier duda que tengas estoy disponible mediante el panel de preguntas y respuestas para ayudarte.