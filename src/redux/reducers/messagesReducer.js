import {
	SELECTED_USER,
	NEW_MESSAGE,
	GET_NEW_MESSAGE,
} from '../types/';

const initialState = {
	selectedUserChat: {},
	contNewMessage: 0,
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
				contNewMessage: payload < 0 ? 0 : payload,
			}

		case GET_NEW_MESSAGE:
			
			return {
				...state,
				contNewMessage: payload,
			}

		default: return state;
	}
}