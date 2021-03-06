import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch  } from 'react-router-dom';

import ChatProductPage from '../components/ChatProductPage';
import { useForm } from '../../../customHooks/useForm';
import { usePagination } from '../../../customHooks/usePagination';
import { useValidateForm } from '../../../customHooks/useValidateForm';
import { SocketContext } from '../../../context/SocketContext';
import { commentsProductAction } from '../../../redux/actions/commentAction';
import { alert } from '../../../utils/alert';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const ChatProduct = ({ auth, ownerProduct, user }) => {

	const dispatch = useDispatch();

	const matches = useMediaQuery('(max-width: 399px)');
	
	const match = useRouteMatch();
	const { id } = match.params;

	const [ formData, handleChange, desactiveBtn, setDesactiveBtn ] = useForm({
		comment: '',
	});

	const [required, validate] = useValidateForm({
		comment: false,
	});
	const [initial, end, handleChangePage] = usePagination();

	const { socket, online } = useContext( SocketContext );

	const [isRequired, setIsRequired] = useState({});
	const [qualifications, setQualifications] = useState([]);
	const [comments, setComments] = useState([]);

	// Obtener las calificaciones del producto
	useEffect(() => {	
		
		socket.emit('get-qualification-product', id, resp => setQualifications(resp));

		return () => {

			socket.off('get-qualification-product');
			setQualifications([]);
		}
		
	}, [socket, id]);
	
	// Obtener los comentarios del producto cuando el componente se monta
	useEffect(() => {
		
		socket.emit('get-comments', id, resp => {
			
			const { ok, messages } = resp;
			
			if (ok) {

				setComments(messages);
				dispatch( commentsProductAction(messages) );
			
			} else alert('error', messages);
		});
		
		return () => socket.off('get-comments');
		
	}, [socket, id, dispatch, user]);

	// Agregar comentario
	useEffect(() => {
		
		socket.on('get-comment', resp => {
			
			const { ok, messages } = resp;
			const { __v, ...body } = messages;
			const arr = [...comments];
			arr.unshift(body);
			
			if (!ok) return alert('error', messages);

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
			img: user.img ? user.img.url : '',
			idUser: user['uid'],
			idProduct: id,
			token: auth.token,
		}

		if (online) socket.emit('add-comment', sendSocket);

		// Desactivando el boton y luego activandolo cuando se quite la alerta
		setDesactiveBtn(true);
		setTimeout(() => setDesactiveBtn(false), 1000);
	}
	
	return (
		<ChatProductPage
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

export default ChatProduct;