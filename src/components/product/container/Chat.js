import React from 'react';

import ChatPage from '../components/ChatPage';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const Chat = ({ classes, isAuthenticated, nameUser, theme }) => {

	const matches = useMediaQuery('(max-width: 399px)');
	
	return (
		<ChatPage
			classes={classes}
			isAuthenticated={isAuthenticated}
			matches={matches}
			nameUser={nameUser}
			theme={theme}
		/>
	)
}

export default Chat;