import React from 'react';

import { Typography } from '@material-ui/core';

const MarkReadAndDelete = ({ deleteAllNotifications, markAllRead }) => (
	
	<div className="d-flex">
		<Typography
			variant="body2"
			component="p"
			className="options allRead mt-3"
			paragraph
			onClick={markAllRead}
		>
			Marcar todo como leido
		</Typography>

		<Typography
			variant="body2"
			component="p"
			className="options mt-3"
			paragraph
			onClick={deleteAllNotifications}
		>
			Eliminar todas las notificaciones
		</Typography>
	</div>
)

export default MarkReadAndDelete;