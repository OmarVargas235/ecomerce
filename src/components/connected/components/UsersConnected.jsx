import React from 'react';

import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const UsersConnected = ({ handleClick, user }) => (
	<ListItem button onClick={() => handleClick(user)}>
		<ListItemIcon>
			<img src={`http://localhost:5000/${user.img}`} alt="img-user" />
		</ListItemIcon>

		<ListItemText primary={user.name + " " + user.lastName} />
	</ListItem>
)

export default UsersConnected;