import {
	GET_PRODUCT,
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
		else dispatch( getProductsFail() );
	
	} catch {

		dispatch( getProductsFail() );
	}
}

const loading = () => ({
	type: LOADING_PRODUCT,
});

const getProducts = payload => ({
	type: GET_PRODUCT,
	payload,
});

const getProductsFail = () => ({
	type: GET_PRODUCT_FAIL,
});