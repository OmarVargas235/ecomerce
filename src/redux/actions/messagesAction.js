import {
	SELECTED_USER,
} from '../types/';

export const selectedUserChatAction = payload => ({
	type: SELECTED_USER,
	payload,
});