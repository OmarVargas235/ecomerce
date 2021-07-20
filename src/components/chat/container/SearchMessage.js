import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SearchMessagePage from '../components/SearchMessagePage';
import { recordChatsAction } from '../../../redux/actions/messagesAction';

const SearchMessage = ({ containerMesssageRef, dispatch, state }) => {
	
	const { chats } = useSelector(state => state.messages);
	const { dataUser } = useSelector(state => state.user);
	const dispatchRedux = useDispatch();

	const { search, chatsMemory } = state;

	// Realizar busqueda en el historial del chat y agregar el efecto scroll cuando cambia de chat
	useEffect(() => {
		
		const nameWhole = dataUser.name + ' ' + dataUser.lastName;

		// agregar el efecto scroll cuando cambia de chat
		const { current:element } = containerMesssageRef;
		element && element.scrollTo(0, element.scrollHeight);

		const namesChats = chatsMemory.filter(chat => {
						
			const { nameReceptor, nameRemitter } = chat;
			const nameFind = nameWhole === nameRemitter ? nameReceptor : nameRemitter;

			return nameFind.toLowerCase().indexOf(search.toLowerCase()) === 0 && chat;
		});

		dispatchRedux( recordChatsAction(namesChats) );
		
	}, [dataUser, containerMesssageRef, search, chatsMemory, dispatchRedux]);

	// Cuando un usuario envia un mensaje actuliza el chatsMemory
	useEffect(() => {
		
		(chats.length > chatsMemory.length) &&
			dispatch({ type: 'CHATS_MEMORY', payload: chats });
		
	}, [chats, chatsMemory, dispatch]);
	
	return (
		<SearchMessagePage
			dispatch={dispatch}
		/>
	)
}

export default SearchMessage;