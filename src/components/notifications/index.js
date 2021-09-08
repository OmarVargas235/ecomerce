import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import NotificationsPage from './components/NotificationsPage';
import { requestWithToken } from '../../utils/fetch';
import { alert } from '../../utils/alert';
import { usePagination } from '../../customHooks/usePagination';
import {
	contNotificationsAction,
	deleteNotificationsActions
} from '../../redux/actions/notificationsActions';
import { styleMaterialUiTheme } from '../../utils/styleMaterialUi';

const Notifications = ({ history }) => {

	const { notifications } = useSelector(state => state.notifications);
	const { token } = useSelector(state => state.user.auth);
	const { dataUser } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const theme = styleMaterialUiTheme();

	const [initial, end, handleChangePage] = usePagination(0, 10);

	// Marcar como visto la notificacion, cuando se hace click sobre ella
	const markRead = async index => {

		const pageCurrentNotifications = notifications.slice(initial, end);
		const { uid } = dataUser;
		const { url, view, _id:id } = pageCurrentNotifications[index];

		// Redireccionar despues de que la notificacion ya este marcada como visto
		(url !== '' && !view) && history.push(url);
		
		if (!view) return;

		const resp = await requestWithToken(`view-notification/${id}`, token);
		const { ok, messages, isExpiredToken } = resp;

		if (isExpiredToken) return alert('error', messages);
		else if (!ok) return alert('error', messages);

		url !== '' && history.push(url);
		dispatch( contNotificationsAction(uid) );
	}

	// Marcar todas las notificaciones como leidas
	const markAllRead = async () => {

		const { uid:id } = dataUser;
		const isMarkAllRead = notifications.some(notification => notification.view);

		if (!isMarkAllRead) return;

		const resp = await requestWithToken(`view-notification/${id}`, token);
		const { ok, messages, isExpiredToken } = resp;

		if (isExpiredToken) return alert('error', messages);
		else if (!ok) return alert('error', messages);

		dispatch( contNotificationsAction(id) );
	}

	// Eliminar notificaciones
	const deleteAllNotifications = async () => {

		const { uid:id } = dataUser;

		const resp = await requestWithToken(`delete-notifications/${id}`, token, {}, 'DELETE');
		const { ok, messages, isExpiredToken } = resp;

		if (isExpiredToken) return alert('error', messages);
		else if (!ok) return alert('error', messages);

		dispatch( deleteNotificationsActions() );
		dispatch( contNotificationsAction(id) );
	}

	return (
		<NotificationsPage
			deleteAllNotifications={deleteAllNotifications}
			end={end}
			handleChangePage={handleChangePage}
			initial={initial}
			markRead={markRead}
			markAllRead={markAllRead}
			notifications={notifications}
			theme={theme}
		/>
	)
}

export default Notifications;