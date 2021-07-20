import React, { useEffect, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';

import MessagesChatPage from '../components/MessagesChatPage';
import { requestWithoutToken } from '../../../utils/fetch';
import { alert } from '../../../utils/alert';
import { SocketContext } from '../../../context/SocketContext';

const MessagesChat = ({ containerMesssageRef, dispatch, state }) => {
	
	const { selectedUserChat } = useSelector(state => state.messages);
	const { dataUser } = useSelector(state => state.user);
	
	const { uid:idUser } = dataUser;

	const refMessage = useRef();

	const { socket } = useContext( SocketContext );

	// Obtener los mensajes al cambiar de chat
	useEffect(() => {

		const id = selectedUserChat['_id'] || selectedUserChat.id;

		if (!id) return;

		async function callAPI() {
			
			const resp = await requestWithoutToken(`get-messages/${idUser}+${id}`);
			const { ok, messages:getMessage } = await resp.json();
			
			if (!ok) return alert('error', getMessage);

			dispatch({
				type: 'MESSAGES',
				payload: getMessage,
			});
		}

		callAPI();
		
	}, [idUser, dispatch, selectedUserChat]);

	// Actualizar el chat cada vez que se envia un mensaje
	useEffect(() => {

		const { messages, chatsMemory } = state;
		
		socket.on('message-personal', async resp => {
			
			// Cambiar viewMessage a true cuando se envia un mensaje, para que cuando se realize la busqueda de chat el viewMessage siga activo
			const index = chatsMemory.findIndex(chat => {

				return (chat['of'] === resp['of'] && chat['for'] === resp['for'])
				|| (chat['of'] === resp['for'] && chat['for'] === resp['of']);
			});

			if (index !== -1) {

				chatsMemory[index].viewMessage = true;
				dispatch({ type: 'CHATS_MEMORY', payload: chatsMemory });
			}

			// Guarda los mensajes solamente en el chat en el que se encuentra activo
			const id = selectedUserChat.id || selectedUserChat['_id'];
			const message = await requestWithoutToken(`get-images/${resp['_id']}`);
			const { ok, messages:getImages } = await message.json();

			(id === resp.of || id === resp.for)
			&& dispatch({ type: 'MESSAGES', payload: [...messages, ok ? getImages : resp] });

			// Efecto del scroll
			const { current:element } = containerMesssageRef;
			const { current:elementMessage } = refMessage;

			if (!element || !elementMessage) return;

			const height = elementMessage.clientHeight;
			const top = element.scrollTop + element.offsetHeight + height + 9;

			if (top > element.scrollHeight)
				element.scrollTo(0, element.scrollHeight);

		});
		
		return () => socket.off('message-personal');
		
	}, [socket, selectedUserChat, state, containerMesssageRef, dispatch, refMessage]);
	
	return (
		<React.Fragment>
			{
				state.messages.map(el => (
					<MessagesChatPage
						key={el['_id']}
						idUser={idUser}
						message={el}
						refMessage={refMessage}
					/>	
				))
			}
		</React.Fragment>
	)
}

export default MessagesChat;