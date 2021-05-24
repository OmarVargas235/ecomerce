import {
	GET_PRODUCTS,
	GET_PRODUCT,
	GET_PRODUCTS_FAIL,
	GET_PRODUCT_FAIL,
	LOADING_PRODUCT,
} from '../types/';
import { requestWithToken } from '../../utils/fetch';

export const getProductsActions = ({ id, token }) => async dispatch => {
	
	dispatch( loading() );

	try {

		const resp = await requestWithToken(`get-products/${id}`, token);
		const { ok, messages } = await resp.json();
		
		if (ok) dispatch( getProducts(messages) );
	
	} catch {
		
		dispatch( getProductsFail() );
	}
}

const getProducts = payload => ({
	type: GET_PRODUCTS,
	payload,
});

const getProductsFail = () => ({
	type: GET_PRODUCTS_FAIL,
});

export const getProductActions = ({ id, token }) => async dispatch => {
	
	dispatch( loading() );

	try {
		
		const resp = await requestWithToken(`get-product/${id}`, token);
		const { ok, messages } = await resp.json();

		const setCategories = new Set([...messages.categories]);
		messages.categories = setCategories;
		
		if (ok) dispatch( getProduct(messages) );
	
	} catch {
		
		dispatch( getProductFail() );
	}
}

const getProduct = payload => ({
	type: GET_PRODUCT,
	payload,
});

const getProductFail = () => ({
	type: GET_PRODUCT_FAIL,
});

const loading = () => ({
	type: LOADING_PRODUCT,
});