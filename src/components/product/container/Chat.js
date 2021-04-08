import React from 'react';

import ChatPage from '../components/ChatPage';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const Chat = ({ classes, theme }) => {

	const matches = useMediaQuery('(max-width: 399px)');
	
	return (
		<ChatPage
			classes={classes}
			matches={matches}
			theme={theme}
		/>
	)
}

export default Chat;