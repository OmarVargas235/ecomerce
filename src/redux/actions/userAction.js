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
		
		const { ok, messages, isExpiredToken } = await requestWithToken(`add-favorite-product/${id}`,token,formData,'POST');

		// Si el token ya a expirado se deslogea
		if (isExpiredToken) {
			
			dispatch( logoutUser() );
			alert('error', messages);
			
			return;
		}
		
		if (ok) dispatch( productFavorite(messages) );
		else alert('error', messages);
	
	} catch {
		
		alert('error', ['A ocurrido un error']);
	}
}

export const deleteFavoriteProductActions = (formData, id, token) => async dispatch => {
	
	try {
		
		const { ok, messages, isExpiredToken } = await requestWithToken(`delete-favorite-product/${id}`,token, formData, 'DELETE');

		// Si el token ya a expirado se deslogea
		if (isExpiredToken) {
			
			dispatch( logoutUser() );
			alert('error', messages);
			
			return;
		}

		if (ok) dispatch( productFavorite(messages) );
		else alert('error', messages);
	
	} catch {
		
		alert('error', ['A ocurrido un error']);
	}
}

export const getFavoriteProductActions = (id, token) => async dispatch => {
	
	try {

		const data = await requestWithToken(`get-favorite-product/${id}`, token);
		const { ok, messages, isExpiredToken } = await data.json();

		if (isExpiredToken) {
			
			dispatch( logoutUser() );
			alert('error', messages);
			
			return;
		}
		
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