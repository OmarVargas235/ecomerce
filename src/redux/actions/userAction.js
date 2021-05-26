import {
	GET_USER,
	GET_USER_FAIL,
	LOGIN_USER,
	LOGOUT_USER,
	LOADING,
} from '../types/';
import { requestWithToken } from '../../utils/fetch';
import { alert } from '../../utils/alert';

export const getUserAction = token => async dispatch => {
	
	try {
		
		const resp = await requestWithToken('get-user', token);
		const { ok, messages, authBD } = await resp.json();

		if (authBD !== undefined && authBD) {
			
			dispatch( logoutUser() );
			alert(ok ? 'success' : 'error', messages);

			return;
		}
		
		if (ok) dispatch( getUser(messages) );
	
	} catch {
		console.log('error')
		dispatch( getUserFail() );
	}
}

const getUser = payload => ({
	type: GET_USER,
	payload,
});

const getUserFail = () => ({
	type: GET_USER_FAIL,
});

export const logoutUser = () => ({
	type: LOGOUT_USER,
});

export const loginAction = payload => ({
	type: LOGIN_USER,
	payload,
});

export const loadingAction = () => ({
	type: LOADING,
});