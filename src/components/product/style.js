import styled from 'styled-components';

export const ProductStyle = styled.section`
	background-color: white;
	box-shadow: 0 1px 8px 0 rgba(0,0,0,.25);

	.text-green {
		color: #36B875;
	}

	.galerry {
		.container-img {
			border-radius: 4px;
			border: 2px solid rgba(0,0,0,.25);
			width: 50px;
  			height: 52px;
  			padding: 2px;
		}

		img {
			width: 44px;
  			height: 44px;
		}
		
		.active {
			border: 2px solid #3483fa;
		}
	}
`;