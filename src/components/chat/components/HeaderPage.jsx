import React from 'react';
import { useSelector } from 'react-redux';

import { Typography } from '@material-ui/core';

const HeaderPage = () => {

	const { contNewMessage } = useSelector(state => state.messages);

	return (
		<header className="header pl-5 py-4">
			<Typography
				variant="h4"
				component="h4"	
			>
				Mensajes
			</Typography>
			
			<Typography
				variant="body1"
				component="p"
			>
				Tienes {contNewMessage} mensajes sin leer.
			</Typography>
		</header>
	)
}

export default HeaderPage;