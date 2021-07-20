import { requestWithToken } from '../../utils/fetch';
import { alert } from '../../utils/alert';
import { logoutUser } from '../../redux/actions/userAction';

export const callAPI = async (dispatch, url="", formData={}, method="GET") => {

	const token = window.localStorage.getItem('token');
	const resp = await requestWithToken(url, token, formData, method);
	let data = await resp;

	if (method === 'GET') data = await resp.json();	

	const { ok, messages, isExpiredToken } = await data;

	// Si el token ya a expirado se deslogea
	if (isExpiredToken) {
		
		dispatch( logoutUser() );
		alert('error', messages);
		
		return;
	}

	if (!ok) return alert('error', messages);
	
	return messages;
}