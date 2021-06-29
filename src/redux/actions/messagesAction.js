import {
	SELECTED_USER,
	NEW_MESSAGE,
	GET_NEW_MESSAGE,
} from '../types/';
import { alert } from '../../utils/alert';
import { requestWithToken } from '../../utils/fetch';
import { logoutUser } from './userAction';

export const selectedUserChatAction = payload => ({
	type: SELECTED_USER,
	payload,
});

export const contNewMessageAction = (dataUser, contMessage, payload) => async dispatch => {
	
	const { uid } = dataUser;
	const token = window.localStorage.getItem('token');

	let cont = payload === 'plus'
		? contMessage + 1
		: contMessage - payload;
		
	if (payload.type) {
		
		cont = payload.cont;
		cont += contMessage;
	}
	
	dispatch( contNewMessage(cont) );

	try {
		
		const formData = new FormData();
		formData.append('cont', cont);

		const resp = await requestWithToken(`cont-message/${uid}`, token, formData, 'POST');
		const { ok, messages, isExpiredToken } = await resp;

		if (isExpiredToken) {
			
			dispatch( logoutUser() );
			return;
		}

		if (!ok) alert('error', messages);
	
	} catch(err) {
		
		console.log(err);
		alert('error', ['A ocurrido un error']);
	}
}

export const contNewMessage = payload => ({
	type: NEW_MESSAGE,
	payload,
});

export const getNewMessage = payload => ({
	type: GET_NEW_MESSAGE,
	payload,
});