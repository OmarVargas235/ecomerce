import {
	CONT_NOTIFICATIONS,
	NOTIFICATIONS,
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

		default: return state;
	}
}