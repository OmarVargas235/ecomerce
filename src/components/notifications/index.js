import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { NotificationsStyle } from './style';
import NotificationsPage from './NotificationsPage';
import { requestWithToken } from '../../utils/fetch';
import { alert } from '../../utils/alert';
import { contNotificationsAction } from '../../redux/actions/notificationsActions';

import { Typography } from '@material-ui/core';

const Notifications = ({ history }) => {

	const { notifications } = useSelector(state => state.notifications);
	const { token } = useSelector(state => state.user.auth);
	const { dataUser } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const [update, setUpdate] = useState(false);

	const selectNotification = async (index) => {

		const { uid:id } = dataUser;
		const { url, view } = notifications[index];

		(url !== '' && !view) && history.push(url);

		if (!view) return;

		notifications[index].view = false;

		const formData = new FormData();
		formData.append('notifications', JSON.stringify(notifications));

		const resp = await requestWithToken(`view-notification/${id}`, token, formData, 'POST');
		const { ok, messages, isExpiredToken } = resp;

		if (isExpiredToken) return alert('error', messages);
		else if (!ok) return alert('error', messages);

		url !== '' ? history.push(url) : setUpdate(!update);
		dispatch( contNotificationsAction(id) );
	}

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

	return (
		<NotificationsStyle className="container my-5">
			{
				notifications.length === 0
				? <p className="text-center mt-5">No tienes notificaciones</p>
				: notifications.map((notification, index) => (
					<NotificationsPage
						key={index}
						index={index}
						notification={notification}
						selectNotification={selectNotification}
					/>
				))
			}
			
			{
				notifications.length === 0 ? null
				: <Typography
					variant="body2"
					component="p"
					className="allRead mt-3"
					paragraph
					onClick={markAllRead}
				>
					Marcar todo como leido
				</Typography>
			}
		</NotificationsStyle>
	)
}

export default Notifications;