import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import QualificationPage from '../components/QualificationPage';
import { logoutUser } from '../../../redux/actions/userAction';
import { alert } from '../../../utils/alert';
import { createNotifications } from '../../../utils/helper';
import { SocketContext } from '../../../context/SocketContext';

const Qualification = ({ auth, classes, dataUser, id, product, url }) => {

	const dispatch = useDispatch();

	const { socket, online } = useContext( SocketContext );

	const [qualificationUser, setQualificationUser] = useState(null);
	const [point, setPoint] = useState(0);
	const [reviews, setReviews] = useState(0);
	const [update, setUpdate] = useState(false);

	const qualificationProduct = useCallback(resp => {

		const isArray = Array.isArray(resp);
		if (!isArray) return;
		
		// Si "resp" es cero, significa que el producto aun no se a calificado
		if (resp.length === 0) {
			
			setQualificationUser(null);
			setPoint(0);
			setReviews(0);

			return;
		}

		// Obtener la calificacion que el usuario le dio al producto
		const qualification = resp.find(el => el.idUser === dataUser.uid);
		
		// Obetner la suma de todas las calificaciones dadas por los diferentes usuarios
		const totalQualification = resp.reduce((acc, el) => {
			
			return (acc += Number(el.qualification), acc);

		}, 0);
		
		setPoint(Math.round(totalQualification / resp.length));
		setReviews(resp.length);
		
		if (!qualification) return setQualificationUser(null);
		setQualificationUser(qualification.qualification);

	}, [dataUser]);
	
	// Obtiene la calificacion cada vez que que el usuario cambia su calificacion
	useEffect(() => {

		socket.on('get-qualification-product', resp => qualificationProduct(resp));

		return () => {

			socket.off('get-qualification-product');
			setQualificationUser(null);
			setPoint(0);
			setReviews(0);
			setUpdate(false);
		}


	}, [auth, dataUser, id, update, socket, qualificationProduct]);
	
	// Obtiene la calificacion cuando se monta el componente
	useEffect(() => {

		socket.emit('get-qualification-product', id, resp => qualificationProduct(resp));

		return () => socket.off('get-qualification-product');
		
	}, [socket, id, qualificationProduct]);

	const setQualification = async selected => {
		
		const { token } = auth;

		const formData = {
			qualification: selected,
			idUser: dataUser.uid,
			idProduct: id,
			token,
		};

		if (online) socket.emit('qualification-product', formData);

		socket.on('get-qualification-message', resp => {

			const { ok, messages } = resp;

			if (messages[0] === "Este producto a sido eliminado") return alert('error',messages);

			alert(ok ? 'success' : 'error', messages);
			
			// Si el token a expirado
			if (!ok) dispatch( logoutUser() );
		});
		
		setUpdate(!update);

		// Notificar al usuario dueño del producto, que el producto se a calificado
		if (!qualificationUser && dataUser.uid !== product.user['_id']) {
			
			const message = `Calificado el producto de ${product.name}`;
			createNotifications(dataUser, product, socket, message, url);		
		}
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