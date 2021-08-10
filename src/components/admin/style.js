import styled from 'styled-components';

export const AdminStyle = styled.section`

	background-color: white;

	.icon {
		width: 70px;
		height: 70px;
		cursor: pointer;
	}

	p {
		font-weight: 500;
	}
`;

export const ManageUsersCardStyle = styled.section`
	
	background-color: white;

	.link {
		background-color: #212121;
		border-radius: 50%;
		width: 35px;
		height: 35px;
		transition: .2s ease-in-out;

		svg {
			fill: white;
			margin-right: 0 !important;
		}

		&:hover {
			background-color: #171717;
		}
	}
`;