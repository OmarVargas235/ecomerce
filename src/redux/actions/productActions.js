import {
	GET_PRODUCTS,
	GET_PRODUCT,
	GET_PRODUCTS_FAIL,
	GET_PRODUCT_FAIL,
	LOADING_PRODUCT,
} from '../types/';
import { requestWithoutToken } from '../../utils/fetch';

export const getProductsActions = id => async dispatch => {
	
	dispatch( loading() );

	try {

		const resp = await requestWithoutToken(`get-products/${id}`);
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

export const getProductActions = id => async dispatch => {
	
	dispatch( loading() );

	try {
		
		const data = await requestWithoutToken(`get-product/${id}`);
		const { ok, messages } = await data.json();
		
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

export const productsSearchActions = payload => ({
	type: GET_PRODUCTS,
	payload
});