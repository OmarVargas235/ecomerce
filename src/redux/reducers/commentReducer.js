import {
	COMMENTS_PRODUCT,
} from '../types/';

const initialState = {
	comments: [],
}

function commentReducer(state = initialState, { type, payload }) {
	
	switch (type) {

		case COMMENTS_PRODUCT:

			return {
				...state,
				comments: payload,
			}

		default: return state;
	}
}

export default commentReducer;