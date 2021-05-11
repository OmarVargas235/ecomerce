import {
	ADD_CART,
	DELETE_CART,
	CLEAR_CART,
} from '../types/';


export const addAction = payload => ({
	type: ADD_CART,
	payload,
});

export const deleteAction = payload => ({
	type: DELETE_CART,
	payload,
});

export const clearAction = () => ({
	type: CLEAR_CART,
});