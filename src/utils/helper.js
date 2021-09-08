import React from 'react';

import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import { requestWithoutToken } from './fetch';
import { alert } from './alert';
import { logoutUser } from '../redux/actions/userAction';

export const categorysScoreValue = [5, 4, 3, 2, 1];
export const categorysScore = [
	<React.Fragment>
		<StarIcon color="primary" />
		<StarIcon color="primary" />
		<StarIcon color="primary" />
		<StarIcon color="primary" />
		<StarIcon color="primary" />
	</React.Fragment>,
	<React.Fragment>
		<StarIcon color="primary" />
		<StarIcon color="primary" />
		<StarIcon color="primary" />
		<StarIcon color="primary" />
		<StarBorderIcon />
	</React.Fragment>,
	<React.Fragment>
		<StarIcon color="primary" />
		<StarIcon color="primary" />
		<StarIcon color="primary" />
		<StarBorderIcon />
		<StarBorderIcon />
	</React.Fragment>,
	<React.Fragment>
		<StarIcon color="primary" />
		<StarIcon color="primary" />
		<StarBorderIcon />
		<StarBorderIcon />
		<StarBorderIcon />
	</React.Fragment>,
	<React.Fragment>
		<StarIcon color="primary" />
		<StarBorderIcon />
		<StarBorderIcon />
		<StarBorderIcon />
		<StarBorderIcon />
	</React.Fragment>,
];

export const categorys = [
	'Juegos PC',
	'Juegos Moviles',
	'Accesorios',
	'Juegos consolas',
	'Componentes',
	'Decoracion'
];

export const createNotifications = (dataUser, idFor, socket, message, url="") => {
	
	const { name, lastName, uid } = dataUser;
	const obj = {
		of: uid,
		for: idFor,
		nameRemitter: name + ' ' + lastName,
		message,
		img: dataUser.img || {},
		url,
	};

	socket.emit('notifications-cont', obj);
}

export const signOff = async (dataUser, dispatch) => {

	const { uid } = dataUser;
	const resp = await requestWithoutToken('logout-user', {id: uid}, 'POST');
	const { ok, messages } = resp;

	if (!ok) return alert('error', messages);
	
	dispatch( logoutUser() );
	alert('success', messages);
}