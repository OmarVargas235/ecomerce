import React from 'react';

import { Typography } from '@material-ui/core';

const MessagesChatPage = ({ index }) => (
	<div
		className={`${index === 0 ? 'message-received' : 'message-send'} px-3 py-2 mb-2`}
	>
		<Typography
			variant="subtitle2"
			component="p"
			className="font-weight-normal"
		>
			hace 9 meses
		</Typography>

		<Typography
			variant="subtitle2"
			component="span"
			className="font-weight-normal"
		>
			¡Hola! Muchas gracias por inscribirte a este curso que estoy seguro que será de tu agrado. Cualquier duda que tengas estoy disponible mediante el panel de preguntas y respuestas para ayudarte.
		</Typography>
	</div>	
)

export default MessagesChatPage;