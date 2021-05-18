import styled from 'styled-components';

export const EditUserStyle = styled.section`
	background-color: white;

	.container__url {

		.url {
			background-color: #F2F3F5;
			border: 1px solid #8A92A3;
			border-right: none;
			border-top-left-radius: 2px;
			border-bottom-left-radius: 2px;
		}

		input {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}

		@media (max-width: 450px) {
			span {
				width: 150px;
				overflow: hidden;
			}
		}

		@media (max-width: 360px) {
			span {
				width: 100px;
			}
		}
	}
`;