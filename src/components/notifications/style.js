import styled from 'styled-components';

export const NotificationsStyle = styled.section`
	
	background-color: #FFFFFF;

	.notifications {
		border-bottom: 1px solid rgba(222,223,224,.45);
		cursor: pointer;

		&:hover {
			background-color: #F7F8FA;
		}
	}

	.message-notification {
		position: relative;

		&::before {
			display: block;
			content: '';
			position: absolute;
			width: 10px;
			height: 10px;
			// background-color: #007791;
			border: 1px solid lightgray;
			border-radius: 50%;
			right: 0;
		}
	}

	.allRead {
		color: #007791;
		cursor: pointer;

		&:hover {
			color: black;
		}
	}
`;