import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ControlPanel from '../../layaut/ControlPanel';
import ListConnectedPage from './components/ListConnectedPage';
import { SocketContext } from '../../context/SocketContext';
import { receptorAction } from '../../redux/actions/messagesAction';

const ListConnected = ({ history }) => {

	const { dataUser } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const { socket, online } = useContext( SocketContext );

	const [usersConnected, setUsersConnected] = useState([]);

	// Obteniendo usuarios conectados
	useEffect(() => {

		if (online) {

			socket.emit('get-users-connected');
			socket.on('get-users-connected', resp => {

				const users = resp.filter(user => user.id !== dataUser.uid);
				setUsersConnected(users);
			});
		}
		
		return () => socket.off('get-users-connected');
		
	}, [socket, online, dataUser]);

	const handleClick = user => {

		history.push('/mensajes');
		dispatch( receptorAction(user) );
	}
	
	return (
		<ControlPanel
			component={() => <ListConnectedPage
				handleClick={handleClick}
				usersConnected={usersConnected}
			/>}
			title="Lista de conectados"
			text="Revisa las personas conectadas actualmente"
		/>
	)
}

export default ListConnected;