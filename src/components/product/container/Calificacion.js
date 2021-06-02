import React, { useState, useEffect } from 'react';

import CalificacionPage from '../components/CalificacionPage';
import { requestWithToken } from '../../../utils/fetch';
import { alert } from '../../../utils/alert';

const Calificacion = ({ auth, classes, dataUser, id, }) => {

	const [calificacionUser, setCalificacionUser] = useState(null);
	const [point, setPoint] = useState(0);
	const [reseñas, setReseñas] = useState(0);
	const [update, setUpdate] = useState(false);

	useEffect(() => {

		async function callAPI() {

			const resp = await requestWithToken(`get-calificar-product/${id}`, auth.token);
			const { ok, messages } = await resp.json();
			
			if (messages.length === 0) {
				
				setCalificacionUser(null);
				setPoint(0);
				setReseñas(0);

				return;
			}

			if (ok) {
				
				const calificacion = messages.find(el => el.idUser === dataUser.uid);
				const totalCalificaciones = messages.reduce((acc, el) => {
					
					return (acc += Number(el.calificacion), acc);

				}, 0);

				setCalificacionUser(calificacion.calificacion);
				setPoint(Math.round(totalCalificaciones / messages.length));
				setReseñas(messages.length);

			} else alert('error', messages);
		}

		callAPI();

	}, [auth, dataUser, id, update]);

	const setCalificacion = async selected => {
		
		const { token } = auth;

		const formData = new FormData();
		formData.append('calificacion', selected);
		formData.append('idUser', dataUser.uid);	
		
		const resp = await requestWithToken(`calificar-product/${id}`, token, formData,'POST');
		const { ok, messages } = await resp;

		alert(ok ? 'success' : 'error', messages);

		setUpdate(!update);
	}
	
	return (
		<CalificacionPage
			classes={classes}
			isAuthenticated={auth.isAuthenticated}
			point={point}
			setCalificacion={setCalificacion}
			calificacionUser={calificacionUser}
			reseñas={reseñas}
		/>
	)
}

export default Calificacion;