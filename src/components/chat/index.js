import React, { useState, useEffect, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ChatPage from './components/ChatPage';
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

	const [selectedMessage, setSelectedMessage] = useState(!matchesContainerMessages);
	const [messages, setMessages] = useState([]);
	const [chats, setChats] = useState([]);
	const [chatsMemory, setChatsMemory] = useState([]);
	const [isBold, setIsBold] = useState(false);
	const [isCursive, setIsCursive] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [isChangeRecordChat, setIsChangeRecordChat] = useState(false);
	const [search, setSearch] = useState('');
	
	// Realizar busqueda en el historial del chat y agregar el efecto scroll
	useEffect(() => {
		
		const { current:element } = containerMesssageRef;
		element && element.scrollTo(0, element.scrollHeight);

		if (search.trim() === '') return;

		const namesChats = chatsMemory.filter(chat => {
						
			const { nameReceptor } = chat;
			return nameReceptor.toLowerCase().indexOf(search.toLowerCase()) === 0 && chat;
		});
		
		setChats(namesChats);
		
	}, [search, dataUser, chatsMemory, containerMesssageRef]);

	// Obtener los mensajes al cambiar de chat
	useEffect(() => {
		
		if ( Object.values(selectedUserChat).length === 0 ) return;

		async function callAPI() {

			const id = selectedUserChat.id ? selectedUserChat.id : selectedUserChat['_id'];

			const resp = await requestWithoutToken(`get-messages/${id}+${dataUser.uid}`);
			const { ok, messages:getMessage } = await resp.json();

			if (!ok) return alert('error', getMessage);

			setMessages(getMessage);
		}

		callAPI();
		
	}, [selectedUserChat, dataUser]);

	// Cargar el historial del chat cuando se recarga la pagina
	useEffect(() => {

		if (!dataUser.uid) return;

		async function callAPI() {

			const resp = await requestWithoutToken(`get-record-users/${dataUser.uid}`);
			const { ok, messages } = await resp.json();
			const recordChats = [];

			if (!ok) return alert('error', messages);

			messages.forEach(chat => {

				const id = chat.for === dataUser.uid ? chat.of : chat.for;

				const index = recordChats.findIndex(el => {

					const compareId = dataUser.uid === el.for ? el.of : el.for;
					return compareId === id;
				});
				
				index === -1 ? recordChats.push(chat) : recordChats[ index ] = chat;
			});

			const id = selectedUserChat.id ? selectedUserChat.id : selectedUserChat['_id'];
			const indexChat = recordChats.findIndex(chat => chat['of'] === id || chat['for'] === id);
			
			if (indexChat !== -1 && isChangeRecordChat) {

				const id = selectedUserChat.id
				? selectedUserChat.id
				: selectedUserChat['_id'];
		
				const resp = await requestWithoutToken(`get-messages/${id}+${dataUser.uid}`);
				const { messages:getMessage } = await resp.json();

				recordChats[indexChat].viewMessage
				&& dispatch( contNewMessageAction( dataUser, contNewMessage, getMessage.length ) );
				
				socket.emit('view-message', recordChats[indexChat]);
				recordChats[indexChat].viewMessage = false;
			}

			setChats(recordChats);
			setChatsMemory(recordChats);
		}

		isMounted && callAPI();
		setIsMounted(true);
		
		return () => setIsMounted(false);
		
	}, [dataUser, isMounted, selectedUserChat, isChangeRecordChat, socket, dispatch]);
	
	// Actualizar el chat cada vez que se envia un mensaje
	useEffect(() => {
		
		socket.on('message-personal', resp => {

			const id = selectedUserChat.id ? selectedUserChat.id : selectedUserChat['_id'];

			// Guardar mensaje en chat en el que se encuentra activo
			(id === resp.of || id === resp.for)
			&& setMessages([...messages, resp]);

			if (resp.of === dataUser.uid || resp.for === dataUser.uid) {

				// Mostrar y actualizar lista de chats
				const arr = [...chats];
				const indexChat = chats.findIndex(chat => {

					return (chat['of'] === resp['of'] && chat['for'] === resp['for'])
					|| (chat['of'] === resp['for'] && chat['for'] === resp['of']);
				});
			
				if (indexChat !== -1) {

					arr[indexChat] = resp;
					setChats(arr);

				} else {

					setChats([...chats, resp]);
					setChatsMemory([...chats, resp]);
				}
			}
			
			dispatch( contNewMessageAction(dataUser, contNewMessage, 'plus') );

			// Efecto del scroll
			const { current:element } = containerMesssageRef;
			
			if (!element) return;

			if (element.scrollTop + 309 === element.scrollHeight)
				element.scrollTo(0, element.scrollHeight);

		});
		
		return () => socket.off('message-personal');
		
	}, [dispatch, socket, messages, chats, selectedUserChat, dataUser, containerMesssageRef, contNewMessage]);

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
				isBold,
				isCursive,
			};

			socket.emit('message-personal', obj);
		}
	}

	const selectedOption = text => {
		

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

			setChats(copyChats);
		}

		if (text === 'bold' && !isBold) setIsBold(true);
		else if (text === 'bold' && isBold) setIsBold(false);
		
		if (text === 'cursive' && !isCursive) setIsCursive(true);
		else if (text === 'cursive' && isCursive) setIsCursive(false);
	}

	const changeChat = async id => {

		setSelectedMessage(true);
		setIsChangeRecordChat(true);

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
			chats={chats}
			containerMesssageRef={containerMesssageRef}
			changeChat={changeChat}
			dataUser={dataUser}
			handleChange={handleChange}
			isBold={isBold}
			isCursive={isCursive}
			matchesContainerMessages={matchesContainerMessages}
			messages={messages}
			selectedOption={selectedOption}
			selectedUserChat={selectedUserChat}
			selectedMessage={selectedMessage}
			setSearch={setSearch}
			writeMessage={writeMessage}
		/>
	)
}

export default Chat;

// ¡Hola! Muchas gracias por inscribirte a este curso que estoy seguro que será de tu agrado. Cualquier duda que tengas estoy disponible mediante el panel de preguntas y respuestas para ayudarte.