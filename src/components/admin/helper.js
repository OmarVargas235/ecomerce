import Swal from 'sweetalert2';

import { requestWithToken, requestWithoutToken } from '../../utils/fetch';
import { logoutUser } from '../../redux/actions/userAction';
import { alert } from '../../utils/alert';

export const callAPI = async (obj) => {
	
	const {
		id,
		title,
		text,
		message,
		fireMessage1,
		fireMessage2,
		url,
		urlHome,
		token,
		dispatch,
		history,
	} = obj;

	const resp = await Swal.fire({
		title,
		text,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#212121',
		cancelButtonColor: '#E12727',
		confirmButtonText: message,
	}).then(async (result) => {
			
		if (result.isConfirmed) {
			Swal.fire(
				fireMessage1,
				fireMessage2,
				'success'
			);
			
			const formData = new FormData();
			formData.append('id', id);

			const request = urlHome ? 'DELETE' : 'POST';
			const { ok, messages, isExpiredToken } = await requestWithToken(url, token, formData, request);

			if (isExpiredToken) {
				
				dispatch( logoutUser() );
				alert('error', messages);

				return;
			}

			if (!ok) return alert('error', messages);
			
			if (urlHome) {
				
				await requestWithoutToken(urlHome, {id}, 'DELETE');
				history.push('/admin');
			}
			
			return messages;
		}
	});

	return resp;
}