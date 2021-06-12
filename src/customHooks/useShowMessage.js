import { useEffect } from 'react';
import { requestWithoutToken } from '../utils/fetch';
import { alert } from '../utils/alert';

export const useShowMessage = (history, url) => {
	
	useEffect(() => {
		
		async function showMessage() {
			
			const data = await requestWithoutToken(url);
			const { ok, messages, empty, changePassword } = await data.json();
			
			// Cuando se cambia la contraseña el token expira redireccionandolo al login
			if (ok === undefined && !messages && empty === undefined) {

				if (changePassword) history.replace('/iniciar-sesion');

				return;
			}

			// Mensaje de cuenta activada o de token expirado
			if (empty) return;
			alert(ok ? 'success' : 'error', messages);
		}

		showMessage();

	}, [history, url]);

	return null;
}