import React from 'react';

import ChatPage from '../components/ChatPage';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const Chat = ({ isAuthenticated, nameUser }) => {

	const matches = useMediaQuery('(max-width: 399px)');
	
	return (
		<ChatPage
			isAuthenticated={isAuthenticated}
			matches={matches}
			nameUser={nameUser}
		/>
	)
}

export default Chat;