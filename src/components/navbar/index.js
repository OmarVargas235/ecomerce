import React, { useState, useEffect, useContext, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { styleMaterialUiTheme } from '../../utils/styleMaterialUi';

import { getUserAction, loginAction } from '../../redux/actions/userAction';
import {
	contNewMessageAction,
	recordChatsAction,
} from '../../redux/actions/messagesAction';
import NavbarPage from './components/NavbarPage';
import { SocketContext } from '../../context/SocketContext';
import { requestWithoutToken } from '../../utils/fetch';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));

const Navbar = ({ history }) => {
	
	// Redux
	const dispatch = useDispatch();
	const { dataUser, auth } = useSelector(state => state.user);
	const { contNewMessage, chats } = useSelector(state => state.messages);

	// Variables y metodos de material ui
	const matches = useMediaQuery('(min-width:768px)');
	const classes = useStyles();
	const theme = styleMaterialUiTheme();

	const { socket } = useContext( SocketContext );
	
	// Estados del componente
  	const [activeSearch, setActiveSearch] = useState(false);

  	 // Detecta cuando esta en '/crear-cuenta' o '/iniciar-sesion' y agrega los estilos correspondientes
  	const isActiveLink = useMemo(() => {
		
		if (history.location.pathname === '/crear-cuenta') return 0;
		else if (history.location.pathname === '/iniciar-sesion') return 1;
		
		return false;

  	}, [history.location]);

  	useEffect(() => {

  		const token = window.localStorage.getItem('token') || '';
			
  		dispatch( getUserAction(token) );
  		token && dispatch( loginAction(token) );

  	}, [dispatch]);
	
	// Obetner el contador de mensajes del usuario cuando recarga la pagina
  	useEffect(() => {
		
		if ( Object.keys(dataUser).length === 0 ) return;
  		dispatch( contNewMessageAction(dataUser) );
  		
  	}, [dispatch, dataUser]);

  	// Actualizar o agregar el(al) historial del chat cada vez que se envia un mensaje
  	useEffect(() => {
		
		// Mostrar y actualizar lista de chats			
		socket.on('get-message-personal', async resp => {

			let recordChats;
			const arr = [...chats];
			const indexChat = chats.findIndex(chat => {

				return (chat['of'] === resp['of'] && chat['for'] === resp['for'])
				|| (chat['of'] === resp['for'] && chat['for'] === resp['of']);
			});

			resp.viewMessage = true;
			
			// Si es diferente de -1, actualiza el ultimo chat, de lo contrario lo agrega
			if (indexChat !== -1) {

				arr[indexChat] = resp;
				recordChats = arr;

			} else recordChats = [...chats, resp];
			
			await requestWithoutToken(`records-chat/${dataUser.uid}`,recordChats, 'POST');
			dispatch( recordChatsAction(recordChats) );
			dispatch( contNewMessageAction(dataUser) );
		});
		
		return () => socket.off('get-message-personal');
	
	}, [socket, chats, dispatch, dataUser]);
	
	return (
		<NavbarPage
			auth={auth}
			activeSearch={activeSearch}
			contNewMessage={contNewMessage}
			classes={classes}
			dataUser={dataUser}
			history={history}
			isActiveLink={isActiveLink}
			matches={matches}
			setActiveSearch={setActiveSearch}
			theme={theme}
		/>
	)
}

export default withRouter(Navbar);