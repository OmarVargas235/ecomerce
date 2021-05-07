import { useEffect } from 'react';
import { requestWithoutToken } from '../utils/fetch';
import { alert } from '../utils/alert';

export const useShowMessage = (history, url) => {
	
	useEffect(() => {
		
		async function showMessage() {
			
			const data = await requestWithoutToken(url);
			const { ok, messages, empty, changePassword } = await data.json();
			
			if (ok === undefined && !messages && empty === undefined) {

				if (changePassword) history.replace('/iniciar-sesion');

				return;
			}

			if (empty) return;
			alert(ok ? 'success' : 'error', messages);

		}

		showMessage();

	}, [history, url]);

	return null;
}