import {
	ADD_PRODUCT_HOME,
	DELETE_PRODUCT_HOME,
} from '../types/';

const initialState = {
	products: [],
}

function productsHome(state = initialState, { type, payload }) {
	
	switch (type) {

		case ADD_PRODUCT_HOME:
			
			return {
				...state,
				products: payload,
			}

		case DELETE_PRODUCT_HOME:
			
			return {
				...state,
				products: state.products.filter(product => product['_id'] !== payload['_id']),
			}

		default: return state;
	}
}

export default productsHome;