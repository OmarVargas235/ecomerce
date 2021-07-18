import React from 'react';
import moment from 'moment';
import 'moment/locale/es';

import { Typography, Grid } from '@material-ui/core';

const MessagesChatPage = ({ idUser, message, refMessage }) => (
	<div
		className={`${idUser === message['of'] ? 'message-received' : 'message-send'} px-3 py-2 mb-2`}
		ref={refMessage}
	>
		<Typography
			variant="subtitle2"
			component="p"
			className="font-weight-normal"
		>
			{moment(new Date(message.date), "YYYYMMDD").fromNow()}
		</Typography>
		
		<Grid container spacing={1}>
			{
				message.images.map((img, index) => (
						
					<Grid item xs={4} key={index}>
						<img
							src={`http://localhost:5000/${img}`}
							alt={`img-${index}`} className="img-fluid"
						/>
        			</Grid>
				))
			}
		</Grid>

		<Typography
			variant="subtitle2"
			component="span"
			className={`${message.isBold ? 'font-weight-bold' : 'font-weight-normal'} ${message.isCursive ? 'cursive' : ''}`}
		>
			{message.message}
		</Typography>
	</div>	
)

export default MessagesChatPage;