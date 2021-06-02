import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CalificacionPage from '../components/CalificacionPage';
import { requestWithToken, requestWithoutToken } from '../../../utils/fetch';
import { logoutUser } from '../../../redux/actions/userAction';
import { alert } from '../../../utils/alert';

const Calificacion = ({ auth, classes, dataUser, id, }) => {

	const dispatch = useDispatch();

	const [calificacionUser, setCalificacionUser] = useState(null);
	const [point, setPoint] = useState(0);
	const [reseñas, setReseñas] = useState(0);
	const [update, setUpdate] = useState(false);

	useEffect(() => {

		async function callAPI() {

			const resp = await requestWithoutToken(`get-calificar-product/${id}`);
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
				
				setCalificacionUser(!calificacion ? null : calificacion.calificacion);
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
		const { ok, messages, isExpiredToken } = await resp;

		if (isExpiredToken) {
			
			dispatch( logoutUser() );
			alert('error', messages);

			return;
		}

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