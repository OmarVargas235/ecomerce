import styled from 'styled-components';

export const ProfileStyle = styled.section`
	background-color: white;
	color: #3C3B37;

	.bold {
		color: #73726C;
	}

	.img-user {
		width: 150px;
		height: 150px;
	}

	.link {
		border: 1px solid #2896A9;
		border-radius: 5px;
		height: 20px;
		cursor: pointer;
		color: #2896A9;
		transition: color .3s ease-in, border .3s ease-in;
		text-decoration: none;

		&:hover {
			border: 1px solid #1C6A78;
			color: #1C6A78;

			.icon {
				color: #1C6A78;
			}
		}

		.icon {
			transition: color .3s ease-in;
			color: #2896A9;
		}
	}

	@media (max-width: 332px) {
		.MuiTypography-body1 {
			font-size: .9rem;
		}
	}
`;