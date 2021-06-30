import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestWithoutToken } from '../../../utils/fetch';
import RecordChatPage from '../components/RecordChatPage';
import { SocketContext } from '../../../context/SocketContext';
import { contNewMessageAction } from '../../../redux/actions/messagesAction';

const RecordChat = ({ changeChat, dataUser, dispatch, state }) => {
	
	const { selectedUserChat, contNewMessage } = useSelector(state => state.messages);
	const dispatchRedux = useDispatch();

	const { socket } = useContext( SocketContext );
	const { isChangeRecordChat, isMounted } = state;

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
				&& dispatchRedux( contNewMessageAction( dataUser, contNewMessage, getMessage.length ) );
				
				socket.emit('view-message', recordChats[indexChat]);
				recordChats[indexChat].viewMessage = false;
			}
			
			dispatch({ type: 'CHATS', payload: recordChats });
			dispatch({ type: 'CHATS_MEMORY', payload: recordChats });
		}

		isMounted && callAPI();
		dispatch({ type: 'MOUNTED', payload: true });
		
		return () => dispatch({ type: 'MOUNTED', payload: false });
		
	}, [dataUser, selectedUserChat, socket, dispatchRedux, dispatch, isChangeRecordChat, isMounted]);
	
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