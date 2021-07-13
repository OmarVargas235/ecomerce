import {
	SELECTED_USER,
	NEW_MESSAGE,
	RECORD_CHATS,
} from '../types/';

const initialState = {
	selectedUserChat: {},
	contNewMessage: 0,
	chats: [],
}

export default function messagesReducer(state=initialState, { type, payload }) {

	switch (type) {
	
		case SELECTED_USER:
			
			return {
				...state,
				selectedUserChat: payload,
			}

		case NEW_MESSAGE:
			
			return {
				...state,
				contNewMessage: payload,
			}

		case RECORD_CHATS:
			
			return {
				...state,
				chats: payload,
			}

		default: return state;
	}
}