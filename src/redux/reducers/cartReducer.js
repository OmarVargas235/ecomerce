import {
	ADD_CART,
	DELETE_CART,
	CLEAR_CART,
} from '../types/';

const initialState = {
	products: [],
}

function cartReducer(state = initialState, { type, payload }) {
	
	switch (type) {

		case ADD_CART:

			return {
				...state,
				products: payload,
			}

		case DELETE_CART:

			return {
				...state,
				products: payload,
			}

		case CLEAR_CART:
			
			return {
				products: [],
			}

		default: return state;
	}
}

export default cartReducer;