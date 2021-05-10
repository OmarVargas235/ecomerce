import {
	GET_DATA_USER,
} from '../types/';

const initialState = {
	dataUser: {},
}

export default function userReducer(state=initialState, { type, payload }) {

	switch (type) {
	
		case GET_DATA_USER:
			
			return {
				...state,
				dataUser: JSON.parse(window.localStorage.getItem('user-login')) || {},
			}

		default: return state;
	}
}