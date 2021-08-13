import Swal from 'sweetalert2';

import { requestWithToken, requestWithoutToken } from '../../utils/fetch';
import { logoutUser } from '../../redux/actions/userAction';
import { alert } from '../../utils/alert';
import { createNotifications } from '../../utils/helper';

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
		socket,
		dataUser,
		data,
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
			
			// Notificar al usuario que su rol a cambiado
			const message = `Tu producto ${data.name}, a sido eliminado por el admin`;
			const { idUser:{_id:idNotification} } = data;

			createNotifications(dataUser, idNotification, socket, message);
			
			return 'messages';
		}
	});

	return resp;
}