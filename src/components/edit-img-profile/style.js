import styled from 'styled-components';

export const EditImgProfileStyle = styled.section`
	background-color: white;

	.container__img-prev {
		border: 1px solid #CACBCC;
	}

	.container__icon-user {
		background-color: #F2F3F5;

		svg {
			width: 200px;
			height: 200px;
			fill: #6A717D;
		}

		img {
			border-radius: 50%;
			width: 200px;
			height: 200px;
		}
	}

	@media (min-width: 992px) {
		&.container {
			padding-right: 9rem !important;
			padding-left: 9rem !important;
		}
	}
`;