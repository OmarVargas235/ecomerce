import React, { useState } from 'react';

import ChatPage from './components/ChatPage';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const Chat = () => {

	const matchesContainerMessages = useMediaQuery('(max-width: 767px)');

	const [selectedMessage, setSelectedMessage] = useState(!matchesContainerMessages);	

	return (
		<ChatPage
			matchesContainerMessages={matchesContainerMessages}
			selectedMessage={selectedMessage}
			setSelectedMessage={setSelectedMessage}
		/>
	)
}

export default Chat;