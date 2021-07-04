import React, { useEffect } from 'react';

import MenuThreePoints from '../../../layaut/MenuThreePoints';
import { callAPI } from '../helper';

const BloquedChat = ({ bloqued, dataUser, dispatch, selectedUserChat, selectedOption, setBloqued }) => {
	
	// Obtener usuarios bloqueados cada vez que se recarga la pagina o se cambia de chat
	useEffect(() => {

		const lngDataUser = Object.keys(dataUser).length === 0;
		const lngSelectedUserChat = Object.keys(selectedUserChat).length === 0;

		if (lngDataUser || lngSelectedUserChat) return;
		
		async function helperAPI() {
			
			const messages = await callAPI(dispatch, `get-idBlockeds/${dataUser.uid}`);
			const id = selectedUserChat['_id'];
			const isIncludes = messages.includes(id);

			setBloqued(isIncludes ? 'Quitar bloqueo' : 'Bloquear');
		}

		helperAPI();
		
	}, [dataUser, selectedUserChat, dispatch, setBloqued]);
	
	return (
		<MenuThreePoints
			handleChange={selectedOption}
			options={['Marcar como leido', 'Marcar como no leido', bloqued]}
		/>
	)
}

export default BloquedChat;