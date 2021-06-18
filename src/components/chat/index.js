import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import ChatPage from './components/ChatPage';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const Chat = () => {

	const { receptor } = useSelector(state => state.messages);

	const matchesContainerMessages = useMediaQuery('(max-width: 767px)');

	const [selectedMessage, setSelectedMessage] = useState(!matchesContainerMessages);	

	return (
		<ChatPage
			matchesContainerMessages={matchesContainerMessages}
			receptor={receptor}
			selectedMessage={selectedMessage}
			setSelectedMessage={setSelectedMessage}
		/>
	)
}

export default Chat;