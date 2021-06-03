import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import QualificationPage from '../components/QualificationPage';
import { requestWithToken, requestWithoutToken } from '../../../utils/fetch';
import { logoutUser } from '../../../redux/actions/userAction';
import { alert } from '../../../utils/alert';

const Qualification = ({ auth, classes, dataUser, id, }) => {

	const dispatch = useDispatch();

	const [qualificationUser, setQualificationUser] = useState(null);
	const [point, setPoint] = useState(0);
	const [reviews, setReviews] = useState(0);
	const [update, setUpdate] = useState(false);
	
	useEffect(() => {
		
		// Obtener la calificacion del producto cuando se carga el componente
		async function callAPI() {

			const resp = await requestWithoutToken(`get-qualification-product/${id}`);
			const { ok, messages } = await resp.json();
			
			// Si "messages" es cero, significa que el producto aun no se a calificado
			if (messages.length === 0) {
				
				setQualificationUser(null);
				setPoint(0);
				setReviews(0);

				return;
			}

			if (ok) {
				
				// Obtener la calificacion que el usuario le dio al producto
				const qualification = messages.find(el => el.idUser === dataUser.uid);
				
				// Obetner la suma de todas las calificaciones dadas por los diferentes usuarios
				const totalQualification = messages.reduce((acc, el) => {
					
					return (acc += Number(el.qualification), acc);

				}, 0);
				
				setQualificationUser(!qualification ? null : qualification.qualification);
				setPoint(Math.round(totalQualification / messages.length));
				setReviews(messages.length);

			} else alert('error', messages);
		}

		callAPI();

	}, [auth, dataUser, id, update]);

	const setQualification = async selected => {
		
		const { token } = auth;

		const formData = new FormData();
		formData.append('qualification', selected);
		formData.append('idUser', dataUser.uid);	
		
		const resp = await requestWithToken(`qualification-product/${id}`, token, formData,'POST');
		const { ok, messages, isExpiredToken } = await resp;
		
		// Si el token a expirado
		if (isExpiredToken) {
			
			dispatch( logoutUser() );
			alert('error', messages);

			return;
		}

		alert(ok ? 'success' : 'error', messages);
		
		setUpdate(!update);
	}
	
	return (
		<QualificationPage
			classes={classes}
			isAuthenticated={auth.isAuthenticated}
			point={point}
			qualificationUser={qualificationUser}
			reviews={reviews}
			setQualification={setQualification}
		/>
	)
}

export default Qualification;