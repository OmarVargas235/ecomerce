import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import SearchMessagePage from '../components/SearchMessagePage';
import { recordChatsAction } from '../../../redux/actions/messagesAction';

const SearchMessage = ({ containerMesssageRef, dataUser, dispatch, state }) => {

	const dispatchRedux = useDispatch();

	const { search, chatsMemory } = state;

	// Realizar busqueda en el historial del chat y agregar el efecto scroll
	useEffect(() => {
		
		const nameWhole = dataUser.name + ' ' + dataUser.lastName;
		const { current:element } = containerMesssageRef;
		element && element.scrollTo(0, element.scrollHeight);

		const namesChats = chatsMemory.filter(chat => {
						
			const { nameReceptor, nameRemitter } = chat;
			const nameFind = nameWhole === nameRemitter ? nameReceptor : nameRemitter;

			return nameFind.toLowerCase().indexOf(search.toLowerCase()) === 0 && chat;
		});

		dispatchRedux( recordChatsAction(namesChats) );
		
	}, [dataUser, containerMesssageRef, search, chatsMemory, dispatchRedux]);
	
	return (
		<SearchMessagePage
			dispatch={dispatch}
		/>
	)
}

export default SearchMessage;