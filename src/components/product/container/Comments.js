import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';
import Swal from 'sweetalert2';

import CommentsPage from '../components/CommentsPage';
import { SocketContext } from '../../../context/SocketContext';

import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  backdrop: {
    zIndex: 3,
    color: '#fff',
  },
}));

const Comments = ({ comment, idUser, qualifications }) => {

	const { dataUser } = useSelector(state => state.user);

	const classes = useStyles();

	moment.locale('es');
	
	// Obtener la primera letra del nombre
	const nameFirstLetter = comment.name.charAt(0).toUpperCase();

	const date = new Date(comment.date);
	const time = moment(date, "YYYYMMDD").fromNow();

	const point = qualifications.find(el => el.idUser === comment.idUser);

	const { socket } = useContext( SocketContext );
	
	const editOrdeleteComment = option => {
		
		if (option === 'Editar') {

			Swal.fire({
				title: 'Editar comentario',
				input: 'text',
				inputValue: comment.comment,
				showCancelButton: true,
				confirmButtonText: 'Editar comentario',
				preConfirm: (text) => {
					
				    const sendSocket = {
				    	comment: text,
				    	idProduct: comment.idProduct,
				    	id: comment['_id'],
				    }

					socket.emit('edit-comment', sendSocket);
				},
			});
		
		} else if (option === 'Eliminar') socket.emit('delete-comment', comment);
	}
	
	return (
		<CommentsPage
			classes={classes}
			comment={comment}
			dataUser={dataUser}
			editOrdeleteComment={editOrdeleteComment}
			idUser={idUser}
			nameFirstLetter={nameFirstLetter}
			point={point?.qualification}
			time={time}
		/>	
	)
}

export default Comments;