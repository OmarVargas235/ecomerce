import {
	ADD_PRODUCT_HOME,
	DELETE_PRODUCT_HOME,
} from '../types/';

export const addProductAction = payload => ({
	type: ADD_PRODUCT_HOME,
	payload,
});

export const deleteProductAction = payload => ({
	type: DELETE_PRODUCT_HOME,
	payload,
});