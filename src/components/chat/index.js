import React from 'react';
import ChatPage from './ChatPage';

const Chat = () => {
	
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	return (
		<ChatPage
			setAnchorEl={setAnchorEl}
			anchorEl={anchorEl}
			open={open}
		/>
	)
}

export default Chat;