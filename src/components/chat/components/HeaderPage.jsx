import React from 'react';

import { Typography } from '@material-ui/core';

const HeaderPage = () => (
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
			Tienes 4 mensajes sin leer.
		</Typography>
	</header>
)

export default HeaderPage;