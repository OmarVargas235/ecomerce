import styled from 'styled-components';

export const NotificationsStyle = styled.section`
	
	background-color: #FFFFFF;

	.notifications {
		border-bottom: 1px solid rgba(222,223,224,.45);
		cursor: pointer;
		position: relative;

		&:hover {
			background-color: #F7F8FA;
		}

		&::before {
			display: block;
			content: '';
			position: absolute;
			width: 10px;
			height: 10px;
			background-color: #007791;
			// border: 1px solid lightgray;
			border-radius: 50%;
			right: 5px;
			top: 5px;
		}

		@media (min-width: 380px) {
			padding-left: 20px !important;
			padding-right: 20px !important;
		}

		@media (min-width: 425px) {
			margin-left: 30px;
			margin-right: 30px;

			&::before {
				right: 10px;
				top: 10px;
			}
		}
	}

	.message-notification {
		color: #505763;
		font-size: 15px;
		height: 45px;
		overflow: hidden;
		text-overflow: ellipsis;
		
		span:last-child {
			white-space: nowrap;
		}
	}

	.allRead {
		color: #007791;
		cursor: pointer;

		&:hover {
			color: black;
		}

		@media (min-width: 425px) {
			margin-left: 30px;
			margin-right: 30px;
		}
	}
`;