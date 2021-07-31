import React, { useState } from 'react';
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

	const [update, setUpdate] = useState(false);

	// Marcar como visto la notificacion, cuando se hace click sobre ella
	const selectNotification = async (index) => {

		const notificationsCurrent = notifications.slice(initial, end);
		const { uid:id } = dataUser;
		const { url, view } = notificationsCurrent[index];

		// Redireccionar despues de que la notificacion ya este marcada como visto
		(url !== '' && !view) && history.push(url);
		
		if (!view) return;

		notificationsCurrent[index].view = false;

		const formData = new FormData();
		formData.append('notifications', JSON.stringify(notifications));

		const resp = await requestWithToken(`view-notification/${id}`, token, formData, 'POST');
		const { ok, messages, isExpiredToken } = resp;

		if (isExpiredToken) return alert('error', messages);
		else if (!ok) return alert('error', messages);

		url !== '' ? history.push(url) : setUpdate(!update);
		dispatch( contNotificationsAction(id) );
	}

	// Marcar todas las notificaciones como leidas
	const markAllRead = async () => {

		const { uid:id } = dataUser;
		const isMarkAllRead = notifications.some(notification => notification.view);

		if (!isMarkAllRead) return;

		notifications.forEach(notification => notification.view = false);

		const formData = new FormData();
		formData.append('notifications', JSON.stringify(notifications));

		const resp = await requestWithToken(`view-notification/${id}`, token, formData, 'POST');
		const { ok, messages, isExpiredToken } = resp;

		if (isExpiredToken) return alert('error', messages);
		else if (!ok) return alert('error', messages);

		dispatch( contNotificationsAction(id) );
		setUpdate(!update);
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
			markAllRead={markAllRead}
			notifications={notifications}
			selectNotification={selectNotification}
			theme={theme}
		/>
	)
}

export default Notifications;