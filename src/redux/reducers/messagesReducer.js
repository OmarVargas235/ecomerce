import {
	SELECTED_USER,
} from '../types/';

const initialState = {
	selectedUserChat: {},
}

export default function messagesReducer(state=initialState, { type, payload }) {

	switch (type) {
	
		case SELECTED_USER:
			
			return {
				...state,
				selectedUserChat: payload,
			}

		default: return state;
	}
}