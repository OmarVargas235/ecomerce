import {
	GET_DATA_USER,
	LOGIN_USER,
} from '../types/';

export const getUserAction = () => ({
	type: GET_DATA_USER,
});

export const loginAction = payload => ({
	type: LOGIN_USER,
	payload,
});