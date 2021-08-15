import React from 'react';
import moment from 'moment';
import 'moment/locale/es';

import { Avatar, Typography } from '@material-ui/core';

const Notification = ({ index, notification, selectNotification }) => (

	<div
		className={`notifications ${notification.view ? 'notification-new' : ''} px-1 py-3`}
		onClick={() => selectNotification(index)}
	>
		<div className="d-flex">
			{
				notification.img
				? <img 
					className="img-user mr-4"
					src={`${process.env.REACT_APP_BACKEND_URL}/${notification.img}`}
					alt="img"
				/>
				: <Avatar className="mr-4">
					{notification.nameRemitter.charAt(0).toUpperCase()}
				</Avatar>
			}
			
			<Typography
				variant="body2"
				component="span"
				paragraph
				className="message-notification"
			>
				{notification.nameRemitter} a:
				<span className="font-weight-bold ml-1">
					{notification.message}
				</span>
			</Typography>
		</div>

		<Typography
				variant="body2"
				component="p"
				color="textSecondary"
				paragraph
				className="mb-0"
			>
				{moment(new Date(notification.date), "YYYYMMDD").fromNow()}
		</Typography>
	</div>
)

export default Notification;