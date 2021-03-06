import {
	ADD_CART,
	DELETE_CART,
	CLEAR_CART,
} from '../types/';
import { alert } from '../../utils/alert';

export const addAction = (product, id, token, isLess=false) => async dispatch => {

	if (product.stock < 1) return alert('error',['No hay stock']);

	// Obtener el localStorage
	const getLS = JSON.parse(window.localStorage.getItem(`cart-${id}`)) || [];
	
	// Verificar si el producto existe en el arreglo del localStorage
	const index = getLS.findIndex(el => el['_id'] === product['_id']);

	// Verifica que si "product" no existe y "product.cont" si, lo resetee en null
	if (index === -1 && product.cont) product.cont = null;	
	
	// Si existe, sobreescribe el contador del producto por el contador guardado en el localStorage
	getLS[index] && (product.cont = getLS[index].cont);

	// Si "product.cont" no existe en el producto lo inisializa en 1
	!product.cont && (product.cont = 1);
	
	// Si no existe en el arreglo del localStorage lo agrega, sino aumenta el contador del producto o si "isLess" es true le resta 1
	(index === -1) ? getLS.push(product) 
	: (isLess ? getLS[index].cont-- : getLS[index].cont++);

	product.cont = getLS[index] ? getLS[index].cont : product.cont;
	
	// Verifica que contador del producto no sea mayor que el del stock
	if (product.cont > product.stock) return alert('error',['Llegaste al maximo stock']);
	
	dispatch( add(getLS) );
	
	window.localStorage.setItem(`cart-${id}`, JSON.stringify(getLS));
}


export const add = payload => ({
	type: ADD_CART,
	payload,
});

export const deleteAction = (product, id, token) => async dispatch => {	

	// Obtener el localStorage
	const getLS = JSON.parse(window.localStorage.getItem(`cart-${id}`)) || [];

	const deleteProductLS = getLS.filter(el => el['_id'] !== product['_id']);

	dispatch( deleteProduct(deleteProductLS) );
	
	window.localStorage.setItem(`cart-${id}`, JSON.stringify(deleteProductLS));
}

const deleteProduct = payload => ({
	type: DELETE_CART,
	payload,
});

export const clearAction = (id, token) => async dispatch => {	

	dispatch( clear() );
	
	window.localStorage.removeItem(`cart-${id}`);
}

const clear = () => ({
	type: CLEAR_CART,
});