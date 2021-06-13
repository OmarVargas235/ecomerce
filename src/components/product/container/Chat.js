import React, { useState, useEffect, useContext } from 'react';
import { useRouteMatch  } from 'react-router-dom';
// import moment from 'moment';

import ChatPage from '../components/ChatPage';
import { useForm } from '../../../customHooks/useForm';
import { useValidateForm } from '../../../customHooks/useValidateForm';
import { SocketContext } from '../../../context/SocketContext';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const Chat = ({ auth, idProduct, user }) => {

	const matches = useMediaQuery('(max-width: 399px)');
	
	const match = useRouteMatch();
	const { id } = match.params;

	// const [ formData, handleChange, desactiveBtn, setDesactiveBtn ] = useForm({
	const [ formData, handleChange ] = useForm({
		comment: '',
	});

	const [required, validate] = useValidateForm({
		comment: false,
	});

	const { socket, online } = useContext( SocketContext );

	const [isRequired, setIsRequired] = useState({});
	const [qualificationUser, setQualificationUser] = useState({});

	// Obtener la calificacion que el usuario le dio al producto del producto
	useEffect(() => {

		if (!auth.isAuthenticated) return;
		
		socket.emit('get-qualification-product', id, resp => {
			
			const qualification = resp.find(el => el.idUser === user['_id']);
			setQualificationUser(qualification);
		});

		return () => socket.off('get-qualification-product');
		
	}, [socket, id, auth, user]);
	
	// Obtener los comentarios del producto cuando el componente se monta
	useEffect(() => {
		
		socket.emit('get-comment', {id, token: auth.token} , resp => {

			console.log(resp);
		});
		
		return () => {
		
		}
		
	}, [socket, auth, id]);

	const leaveComment = e => {
		
		e.preventDefault();

		const { comment } = formData;

		// Validaciones en el frontend
		setIsRequired(required);

		if ( validate({ comment }) ) return;

		// const time = moment("20111031", "YYYYMMDD").fromNow();
		// console.log(time);

		const sendSocket = {
			comment,
			qualification: qualificationUser.qualification,
			name: user.name,
			idUser: user['_id'],
			idProduct,
			token: auth.token,
		}

		if (online) socket.emit('add-comment', sendSocket);

		// alert(ok ? 'success' : 'error', messages);

		// // Desactivando el boton y luego activandolo cuando se quite la alerta
		// setDesactiveBtn(!ok ? true : false);
		// setTimeout(() => setDesactiveBtn(false), 3000);
	}
	
	return (
		<ChatPage
			handleChange={handleChange}
			isAuthenticated={auth.isAuthenticated}
			isRequired={isRequired}
			leaveComment={leaveComment}
			matches={matches}
			nameUser={user.name}
		/>
	)
}

export default Chat;