import styled from 'styled-components';

export const MessagesStyle = styled.section`

	color: #686f7a;
	
	.header {
		background-color: #505763;
		color: white;
	}

	.divider-vertical {
		border-right: 1px solid #DEDFE0;
	}

	.search {
		border: 1px solid #8A92A3;
		font-size: 1rem;
		outline: none;

		> input {}:focus {
			border: 1px solid #76C5D6;
		}
	}

	.container-icon-search {
		background-color: #007791;
		cursor: pointer;
		width: 40px;
		height: 40px;
		color: white;
		transition: background-color .2s ease-out;

		&:hover {
			background-color: #00576B;
		}
	}

	.divider {
		background-color: #DEDFE0;
	}

	.container__messages {
		overflow-y: scroll;
		max-height: 400px;
	}

	.not-read-message {
		height: 55vh;
	}

	.cursive {
		font-style: italic !important;
		font-family: cursive !important;
	}

	.message, .message-new {
		position: relative;
		border-radius: 6px;
		border: 1px solid transparent;
		transition: background-color .2s ease-out, border .2s ease-out;

		.avatar {
			width: 20px;
			height: 20px;
			font-size: 10px;
		}

		.name {
			color: #505763;
		}

		.text {
			font-size: .9rem;

			.icon {
				color: #EBEBEC;
				transition: color .2s ease-out;

				&:hover {
					color: #686F7A;
				}
			}
		}

		.text-message {
			white-space: nowrap;
			width: 250px;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&:hover {
			background-color: white;
			border: 1px solid #dedfe0;

			.icon {
				color: #C6C6CB;
			}
		}

		&::before {
			display: block;
			content: '';
			position: absolute;
			width: 10px;
			height: 10px;
			border: 1px solid lightgray;
			border-radius: 50%;
			left: 5px;
		}
	}

	.message-new {
		&::before {
			background-color: #007791;
		}
	}

	.chat {
		background-color: white;

		.container__messsage-send {
			overflow-y: scroll;
			height: 240px;
		}

		.message-send, .message-received {
			width: 350px;
			word-wrap: break-word;
		}

		.message-send {
			background-color: #F2F3F5;
			border-radius: 6px;
		}

		.message-received {
			position: relative;
			left: calc(100% - 350px);
			background-color: #D3F0BC;
			border-radius: 6px;
		}
	}

	.container__write-message {

		position: relative;

		.isActive {
			border-bottom: 2px solid #007791;
		}

		.container-icon {
			border: 1px solid black;
			border-bottom: none;

			svg {
				color: black;
			}
		}

		input {
			border: 1px solid black;
			height: 80px;
		}

		button {
			position: relative;
			left: calc(100% - 90px);
		}
	}

	.container-upload-img {

		position: relative;
		top: -2px;

		input {
			position: absolute;
			width: 24px;
			max-height: 24px;
			padding: 0;
			border: none;
			left: 0;
			bottom: 0;
			opacity: 0;
		}
	}

	@media (max-width: 768px) {
		.px-5 {
			padding-left: 6rem !important;
			padding-right: 6rem !important;
		}
	}

	@media (max-width: 500px) {
		.px-5 {
			padding-left: 3rem !important;
			padding-right: 3rem !important;
		}
	}

	@media (max-width: 350px) {
		.px-5 {
			padding-left: 1rem !important;
			padding-right: 1rem !important;
		}
	}
`;

export const TextareaStyle = styled.div`
	
	border: 1px solid #8A92A3;
	border: 1px solid ${({ isFocus }) => isFocus ? '#76C5D6' : '#8A92A3'};

	textarea {
		border: none;
		outline: none;
		font-size: 1.1rem;
	}

	.send-img-chat {
		width: 100%;
	}

	.container-images {	
		width: 60px;
		height: 60px;
		position: relative;

		img {
			width: 100%;
			border-radius: 20px;
		}

		.icon {
			position: absolute;
			right: -5px;
			top: -5px;
			background-color: white;
			border-radius: 50%;
		}
	}

	.addToImage {
		border-radius: 20px;
		background-color: #4E5053;
		transition: .2s background-color ease-in-out;

		svg {
			font-size: 2rem;
			background-color: transparent;
			color: #E7E9EC;
		}

		&:hover {
			background-color: #606265;
		}
	}
`;