import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ChatPage from './components/ChatPage';
import { useForm } from '../../customHooks/useForm';
import { useValidateForm } from '../../customHooks/useValidateForm';
import { SocketContext } from '../../context/SocketContext';
import { selectedUserChatAction } from '../../redux/actions/messagesAction';
import { requestWithoutToken } from '../../utils/fetch';
import { alert } from '../../utils/alert';

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

	const [selectedMessage, setSelectedMessage] = useState(!matchesContainerMessages);
	const [messages, setMessages] = useState([]);
	const [chats, setChats] = useState([]);
	const [viewMessage, setViewMessage] = useState(true);
	
	// Actualizar el chat cada vez que se envia un mensaje
	useEffect(() => {
		
		socket.on('message-personal', resp => {

			const id = selectedUserChat.id ? selectedUserChat.id : selectedUserChat['_id'];

			// Guardar mensaje
			(id === resp.of || id === resp.for)
			&& setMessages([...messages, resp]);

			if (resp.of === dataUser.uid || resp.for === dataUser.uid) {

				// Mostrar y actualizar lista de chats
				const arr = [...chats];
				const indexChat = chats.findIndex(chat => chat['of'] === resp['for'] || chat['of'] === resp['of']);
			
				if (indexChat !== -1) {

					arr[indexChat] = resp;
					setChats(arr);
				
				} else setChats([...chats, resp]);
			}

		})
		
		return () => socket.off('message-personal');
		
	}, [socket, messages, chats, selectedUserChat, dataUser]);

	const writeMessage = e => {

		e.preventDefault();

		const { message } = formData;

		if ( validate({ message }) ) return;


		if (online) {

			const obj = {
				of: dataUser.uid,
				for: selectedUserChat.id || selectedUserChat['_id'],
				nameRemitter: dataUser.name + ' ' + dataUser.lastName,
				nameReceptor: selectedUserChat.name + ' ' + selectedUserChat.lastName,
				message,
			};

			socket.emit('message-personal', obj);
		}
	}

	const selectedOption = text => {
		
		if (text === 'Marcar como leido') setViewMessage(false);
		if (text === 'Marcar como no leido') setViewMessage(true);
	}

	const changeChat = async id => {

		setSelectedMessage(true);

		const resp = await requestWithoutToken(`get-user/${id}`);
		const { ok, messages } = await resp.json();

		if (ok) {

			// cambiar el chat
			dispatch( selectedUserChatAction(messages) );

			// Obtener mensajes
			const resp = await requestWithoutToken(`get-messages/${messages['_id']}+${dataUser.uid}`);
			const { ok, messages:getMessage } = await resp.json();
			
			// setViewMessage(false);

			ok && setMessages(getMessage);
		
		} else alert('error', messages);
	}

	return (
		<ChatPage
			chats={chats}
			dataUser={dataUser}
			handleChange={handleChange}
			matchesContainerMessages={matchesContainerMessages}
			messages={messages}
			selectedOption={selectedOption}
			selectedUserChat={selectedUserChat}
			selectedMessage={selectedMessage}
			changeChat={changeChat}
			viewMessage={viewMessage}
			writeMessage={writeMessage}
		/>
	)
}

export default Chat;

// ¡Hola! Muchas gracias por inscribirte a este curso que estoy seguro que será de tu agrado. Cualquier duda que tengas estoy disponible mediante el panel de preguntas y respuestas para ayudarte.