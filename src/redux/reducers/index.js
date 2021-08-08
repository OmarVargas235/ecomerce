import { combineReducers } from 'redux';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import productReducer from './productReducer';
import messagesReducer from './messagesReducer';
import notificationsReucer from './notificationsReucer';
import productsHomeReducer from './homeReducer';

export default combineReducers({
	user: userReducer,
	cart: cartReducer,
	product: productReducer,
	messages: messagesReducer,
	notifications: notificationsReucer,
	productsHome: productsHomeReducer,
});