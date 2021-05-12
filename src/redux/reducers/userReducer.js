import {
	GET_DATA_USER,
	LOGIN_USER,
} from '../types/';

const initialState = {
	dataUser: {},
	auth: {
		isAuthenticated: false,
		token: '',
	}
}

export default function userReducer(state=initialState, { type, payload }) {

	switch (type) {
	
		case GET_DATA_USER:
			
			return {
				...state,
				dataUser: JSON.parse(window.localStorage.getItem('user-login')) || {},
			}

		case LOGIN_USER:

			return {
				...state,
				auth: {
					isAuthenticated: true,
					token: payload,
				},
			}

		default: return state;
	}
}