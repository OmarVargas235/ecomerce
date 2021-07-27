import {
	CONT_NOTIFICATIONS,
	NOTIFICATIONS,
	DELETE_NOTIFICATIONS,
} from '../types/';

const initialState = {
	contNotifications: 0,
	notifications: [],
}

export default function notificationsReucer(state=initialState, { type, payload }) {

	switch (type) {
	
		case CONT_NOTIFICATIONS:
			
			return {
				...state,
				contNotifications: payload,
			}

		case NOTIFICATIONS:
			
			return {
				...state,
				notifications: payload,
			}

		case DELETE_NOTIFICATIONS:
			
			return {
				...state,
				notifications: [],
			}

		default: return state;
	}
}