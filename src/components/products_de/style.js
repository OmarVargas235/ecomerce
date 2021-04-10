import styled from 'styled-components';

export const MoreProductsStyle = styled.article`
	.accordion {
		width: 100%;
	}

	.list {
		border-left: 6px solid #3483FA;
	}

	.list:first-child {
		border-top-left-radius: 4px;
	}

	.list:last-child {
		border-bottom-left-radius: 4px;
	}

	@media (max-width: 599px) {
		.products_cards{
			padding-right: 11rem;
			padding-left: 11rem;
		}
	}

	@media (max-width: 550px) {
		.products_cards{
			padding-right: 8rem;
			padding-left: 8rem;
		}
	}

	@media (max-width: 470px) {
		.products_cards{
			padding-right: 5rem;
			padding-left: 5rem;
		}
	}

	@media (max-width: 375px) {
		.products_cards{
			padding-right: 3rem;
			padding-left: 3rem;
		}
	}
`;