import {
	CONT_NOTIFICATIONS,
	NOTIFICATIONS,
	DELETE_NOTIFICATIONS,
} from '../types/';
import { alert } from '../../utils/alert';
import { requestWithToken } from '../../utils/fetch';
import { logoutUser } from './userAction';

export const contNotificationsAction = id => async dispatch => {
	
	const token = window.localStorage.getItem('token');

	try {

		const resp = await requestWithToken(`get-notifications/${id}`, token);
		const { ok, messages, isExpiredToken } = await resp.json();

		if (isExpiredToken) {
			
			dispatch( logoutUser() );
			return;
		}

		if (!ok) return alert('error', messages);

		const messagesView = messages.filter(notification => notification.view);
		
		dispatch( contNotifications(messagesView.length) );
		dispatch( notifications(messages.reverse()) );
	
	} catch(err) {
		
		console.log(err);
		alert('error', ['A ocurrido un error']);
	}
}

const contNotifications = payload => ({
	type: CONT_NOTIFICATIONS,
	payload,
});

const notifications = payload => ({
	type: NOTIFICATIONS,
	payload,
});

export const deleteNotificationsActions = payload => ({
	type: DELETE_NOTIFICATIONS,
	payload,
});