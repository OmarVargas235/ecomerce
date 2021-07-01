import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestWithoutToken } from '../../../utils/fetch';
import RecordChatPage from '../components/RecordChatPage';
import { SocketContext } from '../../../context/SocketContext';
import { contNewMessageAction } from '../../../redux/actions/messagesAction';

const RecordChat = ({ changeChat, dataUser, dispatch, state }) => {
	
	const { selectedUserChat, contNewMessage } = useSelector(state => state.messages);
	const dispatchRedux = useDispatch();

	const { isChangeRecordChat, isMounted } = state;
	
	const { socket } = useContext( SocketContext );

	// Cargar el historial del chat cuando se recarga la pagina
	useEffect(() => {

		if (!dataUser.uid) return;

		async function callAPI() {

			const resp = await requestWithoutToken(`get-record-users/${dataUser.uid}`);
			const { ok, messages } = await resp.json();
			const recordChats = [];

			if (!ok) return alert('error', messages);
			
			// Filtrar los usuarios que mantienen un chat con la cuenta
			messages.forEach(chat => {
				
				// Obtener id, del usuario al que se le envio el mensaje
				const id = chat.for === dataUser.uid ? chat.of : chat.for;
				
				// Obtener index para saber si el chat ya a sido incluido en el array	
				const index = recordChats.findIndex(el => {

					const compareId = dataUser.uid === el.for ? el.of : el.for;
					return compareId === id;
				});
				
				/*Si index es -1, no esta incluido en el array, de lo contrario remplaza
				el ultimo elemento agregado*/
				index === -1 ? recordChats.push(chat) : recordChats[ index ] = chat;
			});
			
			const id = selectedUserChat.id ? selectedUserChat.id : selectedUserChat['_id'];
			const indexChat = recordChats.findIndex(chat => chat['of'] === id || chat['for'] === id);
			
			// Cambia el estado del mensaje que no a sido visto a visto, y disminuye el contador de mensajes no vistos.
			if (indexChat !== -1 && isChangeRecordChat) {

				const id = selectedUserChat.id
				? selectedUserChat.id
				: selectedUserChat['_id'];
		
				const resp = await requestWithoutToken(`get-messages/${id}+${dataUser.uid}`);
				const { messages:getMessage } = await resp.json();

				recordChats[indexChat].viewMessage
				&& dispatchRedux( contNewMessageAction( dataUser, contNewMessage, getMessage.length ) );
				
				socket.emit('view-message', recordChats[indexChat]);
				recordChats[indexChat].viewMessage = false;
			}
			
			dispatch({ type: 'CHATS', payload: recordChats });
			dispatch({ type: 'CHATS_MEMORY', payload: recordChats });
			dispatch({ type: 'CHANGE_CHAT', payload: false });
		}

		isMounted && callAPI();
		dispatch({ type: 'MOUNTED', payload: true });
		
		return () => dispatch({ type: 'MOUNTED', payload: false });
		
	}, [dataUser, selectedUserChat, socket, dispatchRedux, dispatch, isChangeRecordChat, isMounted, contNewMessage]);
	
	return (
		<React.Fragment>
			{
				state.chats.map((chat, index) => (
					<RecordChatPage
						key={index}
						changeChat={changeChat}
						data={chat}
						idUser={dataUser.uid}
					/>
				))
			}
		</React.Fragment>
	)
}

export default RecordChat;