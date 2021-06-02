import {
	GET_USER,
	GET_USER_FAIL,
	LOGIN_USER,
	LOGOUT_USER,
	FAVORITES_PRODUCTS,
	LOADING,
} from '../types/';

const initialState = {
	dataUser: {},
	auth: {
		isAuthenticated: false,
		token: '',
	},
	loading: true,
	error: '',
	productsFavorites: [],
}

export default function userReducer(state=initialState, { type, payload }) {

	switch (type) {
	
		case GET_USER:
			
			return {
				...state,
				dataUser: payload,
			}

		case GET_USER_FAIL:
			
			return {
				...state,
				error: 'A ocurrido un error',
			}

		case LOGIN_USER:
			
			return {
				...state,
				auth: {
					isAuthenticated: true,
					token: payload,	
				},
			}

		case LOGOUT_USER:
			
			window.localStorage.removeItem('token');

			return {
				...state,
				auth: {
					isAuthenticated: false,
					token: '',	
				},
			}
		case FAVORITES_PRODUCTS:

			return {
				...state,
				productsFavorites: payload,
			}

		case LOADING:
			
			return {
				...state,
				loading: false,
			}

		default: return state;
	}
}