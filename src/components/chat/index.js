import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';

import ChatPage from './components/ChatPage';
import { useForm } from '../../customHooks/useForm';
import { useValidateForm } from '../../customHooks/useValidateForm';
import { SocketContext } from '../../context/SocketContext';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const Chat = () => {

	const { receptor } = useSelector(state => state.messages);
	const { dataUser } = useSelector(state => state.user);

	const matchesContainerMessages = useMediaQuery('(max-width: 767px)');

	const [ formData, handleChange ] = useForm({
		message: '',
	});

	const [, validate] = useValidateForm({ message: false });

	const { socket, online } = useContext( SocketContext );

	const [selectedMessage, setSelectedMessage] = useState(!matchesContainerMessages);
	const [messages, setMessages] = useState([]);
	const [chats, setChats] = useState([]);
	
	// Actualizar el chat cada vez que se envia un mensaje
	useEffect(() => {
		
		socket.on('message-personal', resp => setMessages([...messages, resp]));

		socket.on('message-received', resp => {
			
			const isChat = chats.some(chat => chat['of'] === resp['of']);
			if (!isChat) setChats([...chats, resp]);
		});
		
		return () => {

			socket.off('message-personal');
			socket.off('message-received');
		}
		
	}, [socket, messages, chats]);

	const writeMessage = e => {

		e.preventDefault();

		let { message } = formData;

		if ( validate({ message }) ) return;


		if (online) {

			const obj = {
				of: dataUser.uid,
				for: receptor.id,
				message,
			};

			socket.emit('message-personal', obj);
		}
	}

	return (
		<ChatPage
			chats={chats}
			handleChange={handleChange}
			dataUser={dataUser}
			matchesContainerMessages={matchesContainerMessages}
			messages={messages}
			receptor={receptor}
			selectedMessage={selectedMessage}
			setSelectedMessage={setSelectedMessage}
			writeMessage={writeMessage}
		/>
	)
}

export default Chat;

// ¡Hola! Muchas gracias por inscribirte a este curso que estoy seguro que será de tu agrado. Cualquier duda que tengas estoy disponible mediante el panel de preguntas y respuestas para ayudarte.