import React from 'react';
import moment from 'moment';
import 'moment/locale/es';

import { Typography } from '@material-ui/core';

const MessagesChatPage = ({ idUser, message }) => (
	<div
		className={`${idUser === message['of'] ? 'message-received' : 'message-send'} px-3 py-2 mb-2`}
	>
		<Typography
			variant="subtitle2"
			component="p"
			className="font-weight-normal"
		>
			{moment(new Date(message.date), "YYYYMMDD").fromNow()}
		</Typography>

		<Typography
			variant="subtitle2"
			component="span"
			className="font-weight-normal"
		>
			{message.message}
		</Typography>
	</div>	
)

export default MessagesChatPage;