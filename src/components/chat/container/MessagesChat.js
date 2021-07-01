import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MessagesChatPage from '../components/MessagesChatPage';
import { requestWithoutToken } from '../../../utils/fetch';
import { alert } from '../../../utils/alert';
import { SocketContext } from '../../../context/SocketContext';
import { contNewMessageAction } from '../../../redux/actions/messagesAction';

const MessagesChat = ({ containerMesssageRef, dataUser, dispatch, state }) => {
	
	const { selectedUserChat, contNewMessage } = useSelector(state => state.messages);
	const dispatchRedux = useDispatch();
	
	const { uid:idUser } = dataUser;

	const { socket } = useContext( SocketContext );

	// Obtener los mensajes al cambiar de chat
	useEffect(() => {

		if ( Object.values(selectedUserChat).length === 0 ) return;

		async function callAPI() {

			const id = selectedUserChat.id ? selectedUserChat.id : selectedUserChat['_id'];

			const resp = await requestWithoutToken(`get-messages/${id}+${idUser}`);
			const { ok, messages:getMessage } = await resp.json();

			if (!ok) return alert('error', getMessage);

			dispatch({
				type: 'MESSAGES',
				payload: getMessage,
			});
		}

		callAPI();
		
	}, [selectedUserChat, idUser, dispatch]);

	// Actualizar el chat cada vez que se envia un mensaje
	useEffect(() => {

		const { chats, messages } = state;
		
		socket.on('message-personal', resp => {

			const id = selectedUserChat.id ? selectedUserChat.id : selectedUserChat['_id'];

			// Guarda los mensajes solamente en el chat en el que se encuentra activo
			(id === resp.of || id === resp.for)
			&& dispatch({ type: 'MESSAGES', payload: [...messages, resp] });

			// Mostrar y actualizar lista de chats
			if (resp.of === dataUser.uid || resp.for === dataUser.uid) {
				
				const arr = [...chats];
				const indexChat = chats.findIndex(chat => {

					return (chat['of'] === resp['of'] && chat['for'] === resp['for'])
					|| (chat['of'] === resp['for'] && chat['for'] === resp['of']);
				});
				
				// Si es diferente de -1, actualiza el ultimo chat, de lo contrario lo agrega
				if (indexChat !== -1) {

					arr[indexChat] = resp;
					dispatch({ type: 'CHATS', payload: arr });

				} else {
					
					dispatch({ type: 'CHATS', payload: [...chats, resp] });
					dispatch({ type: 'CHATS_MEMORY', payload: [...chats, resp] });
				}
			}
			
			dispatchRedux( contNewMessageAction(dataUser, contNewMessage, 'plus') );

			// Efecto del scroll
			const { current:element } = containerMesssageRef;
			
			if (!element) return;

			if (element.scrollTop + 309 === element.scrollHeight)
				element.scrollTo(0, element.scrollHeight);
		});
		
		return () => socket.off('message-personal');
		
	}, [socket, selectedUserChat, state, contNewMessage, containerMesssageRef, dispatch, dispatchRedux, dataUser]);
	
	return (
		<React.Fragment>
			{
				state.messages.map(el => (
					<MessagesChatPage
						key={el['_id']}
						idUser={idUser}
						message={el}
					/>	
				))
			}
		</React.Fragment>
	)
}

export default MessagesChat;