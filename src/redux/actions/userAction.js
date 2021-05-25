import {
	GET_USER,
	GET_USER_FAIL,
	LOGIN_USER,
	LOADING,
} from '../types/';
import { requestWithToken } from '../../utils/fetch';

export const getUserAction = token => async dispatch => {

	try {

		const resp = await requestWithToken('get-user', token);
		const { ok, messages } = await resp.json();
		
		if (ok) dispatch( getUser(messages) );
	
	} catch {
		
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

export const loginAction = payload => ({
	type: LOGIN_USER,
	payload,
});

export const loadingAction = () => ({
	type: LOADING,
});