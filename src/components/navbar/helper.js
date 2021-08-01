import { requestWithoutToken } from '../../utils/fetch';
import { alert } from '../../utils/alert';
import { logoutUser } from '../../redux/actions/userAction';

export const signOff = async (dataUser, dispatch) => {

	const { uid } = dataUser;
	const resp = await requestWithoutToken('logout-user', {id: uid}, 'POST');
	const { ok, messages } = resp;

	if (!ok) return alert('error', messages);
	
	dispatch( logoutUser() );
	alert('success', messages);
}