import {
	SELECTED_USER,
	NEW_MESSAGE,
	RECORD_CHATS,
} from '../types/';
import { alert } from '../../utils/alert';
import { requestWithToken } from '../../utils/fetch';
import { logoutUser } from './userAction';

export const selectedUserChatAction = payload => ({
	type: SELECTED_USER,
	payload,
});

export const contNewMessageAction = (dataUser) => dispatch => {
	
	const { uid } = dataUser;
	const token = window.localStorage.getItem('token');

	setTimeout(async () => {

		try {

			const resp = await requestWithToken(`get-record-users/${uid}`, token);
			const { ok, messages, isExpiredToken } = await resp.json();

			if (isExpiredToken) {
				
				dispatch( logoutUser() );
				return;
			}

			if (!ok) return alert('error', messages);

			const messagesView = messages.filter(chat => chat.viewMessage);
			dispatch( contNewMessage(messagesView.length) );
		
		} catch(err) {
			
			console.log(err);
			alert('error', ['A ocurrido un error']);
		}

	}, 1);
}

const contNewMessage = payload => ({
	type: NEW_MESSAGE,
	payload,
});

export const recordChatsAction = payload => ({
	type: RECORD_CHATS,
	payload,
});