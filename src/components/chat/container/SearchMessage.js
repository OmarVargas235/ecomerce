import React, { useEffect } from 'react';
import SearchMessagePage from '../components/SearchMessagePage';

const SearchMessage = ({ containerMesssageRef, dataUser, dispatch, state }) => {

	const { search, chatsMemory } = state;

	// Realizar busqueda en el historial del chat y agregar el efecto scroll
	useEffect(() => {
		
		const nameWhole = dataUser.name + ' ' + dataUser.lastName;
		const { current:element } = containerMesssageRef;
		element && element.scrollTo(0, element.scrollHeight);

		if (search.trim() === '') return;

		const namesChats = chatsMemory.filter(chat => {
						
			const { nameReceptor, nameRemitter } = chat;
			const nameFind = nameWhole === nameRemitter ? nameReceptor : nameRemitter;

			return nameFind.toLowerCase().indexOf(search.toLowerCase()) === 0 && chat;
		});

		dispatch({
			type: 'CHATS',
			payload: namesChats,
		});
		
	}, [dataUser, containerMesssageRef, search, chatsMemory, dispatch]);
	
	return (
		<SearchMessagePage
			dispatch={dispatch}
		/>
	)
}

export default SearchMessage;