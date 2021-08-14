import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ManageUsersCardPage from '../components/ManageUsersCardPage';
import { requestWithToken } from '../../../utils/fetch';
import { alert } from '../../../utils/alert';
import { logoutUser } from '../../../redux/actions/userAction';
import { styleMaterialUiTheme } from '../../../utils/styleMaterialUi';
import { callAPI } from '../helper';
import { createNotifications } from '../../../utils/helper';
import { SocketContext } from '../../../context/SocketContext';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const ManageUsersCard = ({ dataSelected }) => {

	const dispatch = useDispatch();
	const { auth:{token}, dataUser } = useSelector(state => state.user);

	const theme = styleMaterialUiTheme();
	const matches = useMediaQuery('(max-width: 415px)');

const { socket } = useContext( SocketContext );

	const [rol, setRol] = useState('');
	const [selectRol, setSelectRol] = useState('');
	const [ban, setBan] = useState('Banear usuario');
	
	// Obtener el rol que tiene el usuario actualmente
	useEffect(() => {
		
		const { role } = dataSelected;
		const clearRol = role.split('_')[0];

		setRol(clearRol);
		
	}, [dataSelected]);
	
	// Cada vez que recarga la pagina, revisar en la data del usuario si esta baneado o no
	useEffect(() => {
		
		const { ban } = dataSelected;
		setBan(ban ? 'Desbanear usuario' : 'Banear usuario');
		
	}, [dataSelected]);
	
	// Obtener el rol seleccionado
	const handleChange = select => setSelectRol(select);
	
	const changeRol = async () => {
		
		// Si el rol selecionado es igual al rol que tiene el usuario actualmente no lo cambia
		if (selectRol.length === 0 || selectRol === dataSelected.role) return;

		dataSelected.role = selectRol;
			
		const formData = new FormData();
		formData.append('user', JSON.stringify(dataSelected));

		const { ok, messages, isExpiredToken } = await requestWithToken('change-rol-user', token, formData, 'PUT');

		if (isExpiredToken) {
			
			dispatch( logoutUser() );
			alert('error', messages);

			return;
		}

		if (!ok) return alert('error', messages);
		
		const { message, role } = messages;
		
		setRol(role);
		alert('success', message);

		// Notificar al usuario que rol a cambiado
		const messageNotification = `Tu rol a cambiado a ${role}`;
		const { _id:id } = dataSelected;

		createNotifications(dataUser, id, socket, messageNotification);
	}

	const banUser = async () => {
		
		const isBan = (/^Banear/gi).test(ban);

		const obj = {
			id: dataSelected['_id'],
			title: isBan ? 'Esta seguro de banear a este usuario?' : 'Esta seguro de desbanear a este usuario',
			text: isBan ? 'Si lo baneas, puedes volverlo a desbanear' : 'Desbanear',
			message: isBan ? 'Si, banear!' : 'Si, desbanear!',
			fireMessage1: isBan ? 'Baneado!' : 'Desbaneado',
			fireMessage2: isBan ? 'El usuario fue baneado con exito.' : 'Usuario desbaneado con exito.',
			url: 'ban-user',
			token,
			dispatch,
		};

		const resp = await callAPI(obj);
		
		if (resp === undefined) return;
		
		setBan(resp ? 'Desbanear usuario' : 'Banear usuario');
	}
	
	return (
		<ManageUsersCardPage
			ban={ban}
			banUser={banUser}
			changeRol={changeRol}
			dataSelected={dataSelected}
			handleChange={handleChange}
			matches={matches}
			rol={rol}
			theme={theme}
		/>
	)
}

export default ManageUsersCard;