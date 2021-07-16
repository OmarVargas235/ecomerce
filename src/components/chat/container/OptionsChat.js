import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MenuThreePoints from '../../../layaut/MenuThreePoints';
import { callAPI } from '../helper';
import { SocketContext } from '../../../context/SocketContext';
import {
	recordChatsAction,
	contNewMessageAction,
} from '../../../redux/actions/messagesAction';

const OptionsChat = ({ dispatch }) => {

	const { selectedUserChat, chats } = useSelector(state => state.messages);
	const { dataUser } = useSelector(state => state.user);
	const dispatchRedux = useDispatch();

	const { socket } = useContext( SocketContext );

	const [bloqued, setBloqued] = useState('Bloquear');
	
	// Obtener usuarios bloqueados cada vez que se recarga la pagina o se cambia de chat
	useEffect(() => {
		
		const lngDataUser = Object.keys(dataUser).length === 0;
		const lngSelectedUserChat = Object.keys(selectedUserChat).length === 0;
		
		if (lngDataUser || lngSelectedUserChat) return;
		
		// Obtener los usuarios bloqueados cuando se recarga la pagina
		async function helperAPI() {
			
			const messages = await callAPI(dispatch, `get-idBlockeds/${dataUser.uid}`);

			const id = selectedUserChat['_id'] || selectedUserChat.id;
			const isIncludes = messages?.includes(id);

			setBloqued(isIncludes ? 'Quitar bloqueo' : 'Bloquear');
		}

		helperAPI();
		
	}, [dataUser, selectedUserChat, dispatch]);

	/* Seleccionar opciones del chat: Marcar como leido, Marcar como no leido, bloquear*/
	const selectedOption = async text => {

		const { uid } = dataUser;

		if (text === 'Marcar como no leido' || text === 'Marcar como leido') {

			const id = selectedUserChat['_id'];
			const indexChat = chats.findIndex(chat => chat['of']===id||chat['for']=== id);

			if (indexChat < 0) return;

			socket.emit('view-message', {id: uid, indexChat, text}, resp => {
				
				dispatchRedux( contNewMessageAction(dataUser) );
				dispatchRedux( recordChatsAction(resp) );
				dispatch({ type: 'CHATS_MEMORY', payload: resp });
			});
		}

		if (text === 'Bloquear' || text === 'Quitar bloqueo') {
			
			const id = selectedUserChat['_id'] || selectedUserChat.id;
			const formData = new FormData();
			formData.append('idUserBlocked', id);

			const messages = await callAPI(dispatch,`users-blocked/${uid}`,formData,'POST');
			const isIncludes = messages.includes(id);

			setBloqued(isIncludes ? 'Quitar bloqueo' : 'Bloquear');
		}
	}
	
	return (
		<MenuThreePoints
			handleChange={selectedOption}
			options={['Marcar como leido', 'Marcar como no leido', bloqued]}
		/>
	)
}

export default OptionsChat;