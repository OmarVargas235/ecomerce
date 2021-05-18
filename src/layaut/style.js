import styled from 'styled-components';

export const ControlPanelStyle = styled.section`
	background-color: white;

	.box {
		border: 1px solid #DEDFE0;
	}

	.divider-horizontal {
		border-right: 1px solid #DEDFE0;
	}

	.icon {
		width: 50px;
		height: 50px;
	}

	.container__options-user {
		a, p {
			color: #2896A9;
			cursor: pointer;
			padding-top: 5px;
			padding-bottom: 5px;
			padding-left: 20px;
			margin-bottom: 5px;
			text-decoration: none;
			display: block;

			&:hover {
				background-color: #8A92A3;
				color: white;
			}
		}
	}

	input {
		border: 1px solid #8A92A3;
		border-radius: 2px;
		padding: 12px;
		padding-left: 14px;

		&:focus {
			border: 1px solid #76C5D6;
		}
	}

	textarea {
		outline: none;

		&:focus {
			border: 1px solid #76C5D6;
		}
	}

	@media (max-width: 767px) and (min-width: 600px) {
		.container__options-user p {
			padding-left: 10px;
		}

		.px-5 {
			padding-left: 0 !important;
			padding-right: 0 !important;
		}
	}

	@media (max-width: 502px) {
		.px-5 {
			padding-left: 0 !important;
			padding-right: 0 !important;
		}
	}
`;