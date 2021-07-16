import React, { useRef, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ChatPage from './components/ChatPage';
import { initialState, reducer } from './reducer';
import {
	recordChatsAction,
} from '../../redux/actions/messagesAction';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const Chat = () => {

	const { selectedUserChat } = useSelector(state => state.messages);
	const dispatch = useDispatch();

	const matchesContainerMessages = useMediaQuery('(max-width: 767px)');

	const containerMesssageRef = useRef();

	const [state, dispatchState] = useReducer(reducer, initialState);

	// Seleccionar 'todos los mensajes' o solo los 'no leidos', cuando la resolucion de la pantalla es menor a 768px
	const selectedOptionResponsive = (text) => {

		const { chatsMemory } = state;

		if (text === 'Todos los mensajes') {
			
			dispatchState({ type: 'SHOW_MESSAGE_RESPONSIVE', payload: true });
			dispatch( recordChatsAction(chatsMemory) );
		
		} else if (text === 'Sin leer') {
			
			const chatsWithoutView = chatsMemory.filter(chat => chat.viewMessage);
			dispatchState({ type: 'SHOW_MESSAGE_RESPONSIVE', payload: true });
			dispatch( recordChatsAction(chatsWithoutView) );
		
		} else {

			dispatchState({ type: 'SHOW_MESSAGE_RESPONSIVE', payload: false });
		}
	}

	return (
		<ChatPage
			containerMesssageRef={containerMesssageRef}
			dispatch={dispatchState}
			matchesContainerMessages={matchesContainerMessages}
			state={state}
			selectedUserChat={selectedUserChat}
			selectedOptionResponsive={selectedOptionResponsive}
		/>
	)
}

export default Chat;