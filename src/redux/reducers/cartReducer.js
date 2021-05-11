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
			
			// Aumentando el contador del productos si este ya esta agregado al carrito
			const products = state.products.map(product => product.id === payload.id ? (++payload.cont, product) : product);
			
			// Verificar si esta en el carrito o no, para posteriormente agregarlo
			const include = products.some(product => product.id === payload.id);
			
			// Agrega la propiedad contador al producto si no lo tiene 
			if (!payload.cont) payload.cont = 1;

			return {
				...state,
				products: (products.length === 0 || !include) ? [...products, payload] : products,
			}

		case DELETE_CART:
			
			payload.cont = 0;

			return {
				...state,
				products: state.products.filter(product => product.id !== payload.id),
			}

		case CLEAR_CART:
			
			state.products.forEach(product => product.cont = 0);

			return {
				products: [],
			}

		default: return state;
	}
}

export default cartReducer;