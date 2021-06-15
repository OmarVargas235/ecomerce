import React, { useState, useEffect, useContext } from 'react';
import { useRouteMatch  } from 'react-router-dom';

import ChatPage from '../components/ChatPage';
import { useForm } from '../../../customHooks/useForm';
import { useValidateForm } from '../../../customHooks/useValidateForm';
import { SocketContext } from '../../../context/SocketContext';
import { alert } from '../../../utils/alert';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const Chat = ({ auth, ownerProduct, user }) => {

	const matches = useMediaQuery('(max-width: 399px)');
	
	const match = useRouteMatch();
	const { id } = match.params;

	const [ formData, handleChange, desactiveBtn, setDesactiveBtn ] = useForm({
		comment: '',
	});

	const [required, validate] = useValidateForm({
		comment: false,
	});

	const { socket, online } = useContext( SocketContext );

	const [isRequired, setIsRequired] = useState({});
	const [qualifications, setQualifications] = useState([]);
	const [comments, setComments] = useState([]);
	const [initial, setInitial] = useState(0);
	const [end, setEnd] = useState(5);

	// Obtener las calificaciones del producto
	useEffect(() => {
		
		socket.emit('get-qualification-product', id, resp => setQualifications(resp));

		return () => socket.off('get-qualification-product');
		
	}, [socket, id]);
	
	// Obtener los comentarios del producto cuando el componente se monta
	useEffect(() => {
		
		socket.emit('get-comments', id, resp => {
			
			const { ok, messages } = resp;
			
			if (ok) setComments(messages);
			else alert('error', messages);
		});
		
		return () => socket.off('get-comments');
		
	}, [socket, id]);

	// Agregar comentario
	useEffect(() => {
		
		socket.on('get-comment', resp => {
			
			const { ok, messages } = resp;
			const { __v, ...body } = messages;

			const arr = [...comments];
			arr.unshift(body);
			
			if (ok) setComments(arr);
			else alert('error', comments);
		});
		
		return () => socket.off('get-comment');
		
	}, [socket, comments]);

	// Obtener comentarios editados o los comentarios despues de haber eliminado uno
	useEffect(() => {
		
		socket.on('get-comments-edit-delete', resp => {
			
			const { ok, messages } = resp;
			
			if (ok) setComments(messages);
			else alert('error', messages);
		});
		
		return () => socket.off('get-comments-edit-delete');
		
	}, [socket]);

	const leaveComment = e => {
		
		e.preventDefault();

		const { comment } = formData;

		// Validaciones en el frontend
		setIsRequired(required);

		if ( validate({ comment }) ) return;

		const sendSocket = {
			comment,
			name: user.name + ' ' + user.lastName,
			img: user.img,
			idUser: user['uid'],
			idProduct: id,
			token: auth.token,
		}

		if (online) socket.emit('add-comment', sendSocket);

		// Desactivando el boton y luego activandolo cuando se quite la alerta
		setDesactiveBtn(true);
		setTimeout(() => setDesactiveBtn(false), 1000);
	}
	
	// Avanzar o retroceder a la siguiente seccion de comentarios
	const handleChangePage  = (e, newPage) => {
		
		const endPage = newPage * 5;
		const initialPage = endPage - 5;

		setInitial( initialPage );
		setEnd(endPage);
	}
	
	return (
		<ChatPage
			comments={comments}
			desactiveBtn={desactiveBtn}
			end={end}
			handleChange={handleChange}
			handleChangePage={handleChangePage}
			initial={initial}
			isAuthenticated={auth.isAuthenticated}
			isRequired={isRequired}
			leaveComment={leaveComment}
			matches={matches}
			ownerProduct={ownerProduct}
			qualifications={qualifications}
			user={user}
		/>
	)
}

export default Chat;