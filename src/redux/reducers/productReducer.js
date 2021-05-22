import {
	GET_PRODUCT,
	GET_PRODUCT_FAIL,
	LOADING_PRODUCT,
} from '../types/';

const initialState = {
	products: [],
	messageError: '',
	loading: true,
}

export default function userReducer(state=initialState, { type, payload }) {

	switch (type) {
	
		case GET_PRODUCT:
			
			return {
				...state,
				products: payload,
			}

		case GET_PRODUCT_FAIL:
			
			return {
				...state,
				messageError: 'A ocurrido un error',
			}

		case LOADING_PRODUCT:
			
			return {
				loading: false,
			}

		default: return state;
	}
}