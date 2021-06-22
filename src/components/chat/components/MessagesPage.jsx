import React from 'react';
import { Typography, Avatar } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import moment from 'moment';
import 'moment/locale/es';

const MessagesPage = ({ data, idUser, changeChat, viewMessage }) => (
	<div
		className={`${viewMessage ? 'message-new' : 'message'} pl-3 p-2 mb-1 pointer`}
		onClick={() => idUser === data.of ? changeChat(data.for) : changeChat(data.of) }
	>
		<div className="profile d-flex justify-content-between">
			<div className="d-flex">
				<Avatar className="avatar mr-3 text-uppercase">
					{
						idUser === data.of
						? data.nameReceptor.charAt(0) : data.nameRemitter.charAt(0)
					}
				</Avatar>
				
				<Typography
					variant="subtitle1"
					component="span"
					className="name font-weight-bold text-capitalize"
				>
					{ idUser === data.of ? data.nameReceptor : data.nameRemitter }
				</Typography>
			</div>
			
			<Typography
				variant="subtitle1"
				component="span"
			>
				{ moment(new Date(data.date), "YYYYMMDD").fromNow() }
			</Typography>
		</div>

		<div className="text mt-3 d-flex justify-content-between">
			<span className="text-message">{ data.message }</span>
			<DeleteForeverIcon className="icon pointer" />
		</div>
	</div>
)

export default MessagesPage;