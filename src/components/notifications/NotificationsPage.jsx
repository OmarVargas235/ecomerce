import React from 'react';

import { NotificationsStyle } from './style';

import { Avatar, Typography } from '@material-ui/core';

const NotificationsPage = () => (

	<NotificationsStyle className="container p-5">
		<div className="notifications p-3">
			<div className="d-flex">
				<Avatar className="mr-4">OP</Avatar>
				
				<Typography
					variant="body2"
					component="p"
					paragraph
					className="message-notification"
				>
					Ahora puedes navegar de forma privada; las otras personas que usen este dispositivo no verán tu actividad. No obstante, se guardarán las descargas y los marcadores...
				</Typography>
			</div>

			<Typography
					variant="body2"
					component="p"
					color="textSecondary"
					paragraph
				>
					Hace un dia
			</Typography>
		</div>

		<Typography
			variant="body2"
			component="p"
			className="allRead mt-3"
			paragraph
		>
			Marcar todo como leido
		</Typography>
	</NotificationsStyle>
)

export default NotificationsPage;