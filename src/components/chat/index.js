import React, { useState, useContext, useRef, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ChatPage from './components/ChatPage';
import { initialState, reducer } from './reducer';
import { useForm } from '../../customHooks/useForm';
import { useValidateForm } from '../../customHooks/useValidateForm';
import { SocketContext } from '../../context/SocketContext';
import {
	selectedUserChatAction,
	contNewMessageAction,
} from '../../redux/actions/messagesAction';
import { requestWithoutToken } from '../../utils/fetch';
import { alert } from '../../utils/alert';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const Chat = () => {

	const { selectedUserChat, contNewMessage } = useSelector(state => state.messages);
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
	
	const writeMessage = e => {

		e.preventDefault();
		
		const { isCursive, isBold } = state;
		const { message } = formData;

		if ( validate({ message }) ) return;

		if (online) {

			const obj = {
				of: dataUser.uid,
				for: selectedUserChat.id || selectedUserChat['_id'],
				nameRemitter: dataUser.name + ' ' + dataUser.lastName,
				nameReceptor: selectedUserChat.name + ' ' + selectedUserChat.lastName,
				message,
				isBold,
				isCursive,
			};

			socket.emit('message-personal', obj);
		}
	}

	const selectedOption = text => {

		const { chats, messages, isBold, isCursive } = state;

		if (text === 'Marcar como leido' || text === 'Marcar como no leido') {

			const id = selectedUserChat.id ? selectedUserChat.id : selectedUserChat['_id'];
			const uid = dataUser.uid;
			const copyChats = [...chats];
			const index = copyChats.findIndex(chat => (chat.of === id || chat.of === uid) && (chat.for === id || chat.for === uid));
			
			(text === 'Marcar como no leido' && !chats[index].viewMessage)
			&& dispatch( contNewMessageAction(dataUser, contNewMessage, {type: true, cont: messages.length}) );

			(text === 'Marcar como leido' && chats[index].viewMessage)
			&& dispatch( contNewMessageAction(dataUser, contNewMessage, messages.length) );
			
			// copyChats[index].text = Sirve para un condicional en el backend
			copyChats[index].text = 'Marcar como no leido';
			copyChats[index].viewMessage = text === 'Marcar como leido' ? false : true;
			
			socket.emit('view-message', copyChats[index]);

			dispatchState({ type: 'CHATS', payload: copyChats });
		}

		if (text === 'bold' && !isBold) dispatchState({ type: 'IS_BOLD', payload: true });
		else if (text === 'bold' && isBold) dispatchState({ type:'IS_BOLD', payload: false });
		
		if (text ==='cursive' && !isCursive) dispatchState({type: 'IS_CURSIVE',payload:true});
		else if (text === 'cursive' && isCursive)
			dispatchState({type: 'IS_CURSIVE', payload: false});
	}

	const changeChat = async id => {

		setSelectedMessage(true);
		dispatchState({type: 'CHANGE_RECORD_CHAT', payload: true});

		const resp = await requestWithoutToken(`get-user/${id}`);
		const { ok, messages } = await resp.json();

		ok ? dispatch( selectedUserChatAction(messages) ) : alert('error', messages);
	}

	// const deleteRecordMessage = (idUser, data) => {
		
	// 	const id = idUser === data.of ? data.for : data.of;
	// 	const deleteChat = chats.filter(chat => chat.for !== id && chat.of !== id);

	// 	setChats(deleteChat);
	// }

	return (
		<ChatPage
			containerMesssageRef={containerMesssageRef}
			contNewMessage={contNewMessage}
			changeChat={changeChat}
			dataUser={dataUser}
			dispatch={dispatchState}
			handleChange={handleChange}
			matchesContainerMessages={matchesContainerMessages}
			state={state}
			selectedOption={selectedOption}
			selectedUserChat={selectedUserChat}
			selectedMessage={selectedMessage}
			writeMessage={writeMessage}
		/>
	)
}

export default Chat;

// ¡Hola! Muchas gracias por inscribirte a este curso que estoy seguro que será de tu agrado. Cualquier duda que tengas estoy disponible mediante el panel de preguntas y respuestas para ayudarte.