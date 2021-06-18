import {
	RECEPTOR,
} from '../types/';

const initialState = {
	receptor: {},
}

export default function messagesReducer(state=initialState, { type, payload }) {

	switch (type) {
	
		case RECEPTOR:
			
			return {
				...state,
				receptor: payload,
			}

		default: return state;
	}
}