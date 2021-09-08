import React from 'react';

import { ListItem, ListItemIcon, ListItemText, Avatar } from '@material-ui/core';

const UsersConnected = ({ handleClick, user }) => (
	<ListItem button onClick={() => handleClick(user)}>
		<ListItemIcon>
			{
				user.img
				? <img src={user.img.url} alt="img-user" />
				: <Avatar className="avatar mr-3 text-uppercase">
					{ user.name.charAt(0) }
				</Avatar>
			}
		</ListItemIcon>

		<ListItemText primary={user.name + " " + user.lastName} />
	</ListItem>
)

export default UsersConnected;