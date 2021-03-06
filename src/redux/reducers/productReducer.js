import {
	GET_PRODUCTS,
	GET_PRODUCTS_FAIL,
	GET_PRODUCT,
	GET_PRODUCT_FAIL,
	GET_PRODUCT_SEARCH,
	LOADING_PRODUCT,
} from '../types/';

const initialState = {
	products: [],
	productsSearch: [],
	product: {},
	messageError: '',
	loading: true,
}

export default function productReducer(state=initialState, { type, payload }) {

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

		case GET_PRODUCT_SEARCH:
			
			return {
				...state,
				productsSearch: payload,
			}

		case LOADING_PRODUCT:
			
			return {
				...state,
				loading: false,
			}

		default: return state;
	}
}