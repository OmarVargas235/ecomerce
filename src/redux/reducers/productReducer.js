import {
	GET_PRODUCTS,
	GET_PRODUCT,
	GET_PRODUCTS_FAIL,
	GET_PRODUCT_FAIL,
	LOADING_PRODUCT,
} from '../types/';

const initialState = {
	products: [],
	product: {},
	messageError: '',
	loading: true,
}

export default function userReducer(state=initialState, { type, payload }) {

	switch (type) {
	
		case GET_PRODUCTS:
			
			return {
				...state,
				products: payload,
			}

		case GET_PRODUCTS_FAIL:
			
			return {
				...state,
				messageError: 'No se pudo obtener los productos',
			}

		case GET_PRODUCT:
			
			return {
				...state,
				product: payload,
			}

		case GET_PRODUCT_FAIL:
			
			return {
				...state,
				messageError: 'No se pudo obtener el producto',
			}

		case LOADING_PRODUCT:
			
			return {
				...state,
				loading: false,
			}

		default: return state;
	}
}