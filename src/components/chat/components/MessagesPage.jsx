import React from 'react';
import { Typography, Avatar } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const MessagesPage = ({ setSelectedMessage }) => (
	<div
		className="message pl-3 p-2 mb-1 pointer"
		onClick={() => setSelectedMessage(true)}
	>
		<div className="profile d-flex justify-content-between">
			<div className="d-flex">
				<Avatar className="avatar mr-2">H</Avatar>
				
				<Typography
					variant="subtitle1"
					component="span"
					className="name font-weight-bold"
				>
					Omar Vargas
				</Typography>
			</div>
			
			<Typography
				variant="subtitle1"
				component="span"
			>
				Hace 9 meses
			</Typography>
		</div>

		<div className="text mt-3 d-flex justify-content-between">
			<span>¡Hola! Muchas gracias por inscribirte a este curso...</span>
			<DeleteForeverIcon className="icon pointer" />
		</div>
	</div>
)

export default MessagesPage;