import React from 'react';

import { UsersConnectedStyle } from '../style';
import UsersConnected from './UsersConnected';

import List from '@material-ui/core/List';

const ListConnectedPage = ({ handleClick, usersConnected }) => (
	<UsersConnectedStyle>
		<List component="nav" aria-label="main mailbox folders">
			{
				usersConnected.map((user, index) => (
					<UsersConnected
						key={index}
						handleClick={handleClick}
						user={user}
					/>
				))
			}
		</List>
	</UsersConnectedStyle>
)

export default ListConnectedPage;