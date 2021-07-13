import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestWithToken } from '../../../utils/fetch';
import RecordChatPage from '../components/RecordChatPage';
import { SocketContext } from '../../../context/SocketContext';
import { alert } from '../../../utils/alert';
import { recordChatsAction, contNewMessageAction } from '../../../redux/actions/messagesAction';

const RecordChat = ({ changeChat, dataUser, dispatch, state }) => {
	
	const { selectedUserChat, chats } = useSelector(state => state.messages);
	const dispatchRedux = useDispatch();

	const { isMounted, isChangeChat } = state;
	
	const { socket } = useContext( SocketContext );

	// Cargar el historial del chat cuando se recarga la pagina
	useEffect(() => {

		if (!dataUser.uid) return;

		const { uid } = dataUser;

		async function callAPI() {

			const token = window.localStorage.getItem('token');
			const resp = await requestWithToken(`get-record-users/${uid}`, token);
			const { ok, messages } = await resp.json();

			if (!ok) return alert('error', messages);
			
			const id = selectedUserChat.id || selectedUserChat['_id'];
			const indexChat = messages.findIndex(chat => chat['of'] === id || chat['for'] === id);

			// Cambia el estado del mensaje que no a sido visto a visto, y disminuye el contador de mensajes no vistos.
			if (indexChat !== -1 && isChangeChat) {

				dispatchRedux( contNewMessageAction(dataUser) );

				socket.emit('view-message', {id: uid, indexChat}, resp => {
					
					dispatchRedux( recordChatsAction(resp) );
				});
			}
			
			dispatchRedux( recordChatsAction(messages) );
			dispatch({ type: 'CHATS_MEMORY', payload: messages });
			dispatch({ type: 'IS_CHANGE_CHAT', payload: false });
		}

		isMounted && callAPI();
		dispatch({ type: 'MOUNTED', payload: true });
		
		return () => dispatch({ type: 'MOUNTED', payload: false });
	
	},[dataUser, selectedUserChat, isMounted, socket,dispatch,dispatchRedux,isChangeChat]);
	
	return (
		<React.Fragment>
			{
				chats.map((chat, index) => (
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

export default React.memo(RecordChat);