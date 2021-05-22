import { combineReducers } from 'redux';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import productReducer from './productReducer';

export default combineReducers({
	user: userReducer,
	cart: cartReducer,
	product: productReducer,
});