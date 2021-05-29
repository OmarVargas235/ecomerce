import {
	GET_USER,
	GET_USER_FAIL,
	LOGIN_USER,
	LOGOUT_USER,
	FAVORITES_PRODUCTS,
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

export const addFavoriteProductActions = (formData, id, token) => async dispatch => {
	
	try {
		
		const { ok, messages } = await requestWithToken(`add-favorite-product/${id}`,token,formData,'POST');

		if (ok) dispatch( productFavorite(messages) );
		else alert('error', messages);
	
	} catch {
		
		alert('error', ['A ocurrido un error']);
	}
}

export const deleteFavoriteProductActions = (formData, id, token) => async dispatch => {
	
	try {
		
		const { ok, messages } = await requestWithToken(`delete-favorite-product/${id}`,token, formData, 'DELETE');

		if (ok) dispatch( productFavorite(messages) );
		else alert('error', messages);
	
	} catch {
		
		alert('error', ['A ocurrido un error']);
	}
}

export const getFavoriteProductActions = (id, token) => async dispatch => {
	
	try {
		
		const data = await requestWithToken(`get-favorite-product/${id}`, token);
		const { ok, messages } = await data.json();
		
		if (ok) dispatch( productFavorite(messages) );
		else alert('error', messages);
	
	} catch {
		
		alert('error', ['A ocurrido un error']);
	}
}

const productFavorite = payload => ({
	type: FAVORITES_PRODUCTS,
	payload,
});