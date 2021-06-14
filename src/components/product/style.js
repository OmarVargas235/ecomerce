import styled from 'styled-components';

export const ProductStyle = styled.section`
	background-color: white;
	box-shadow: 0 1px 8px 0 rgba(0,0,0,.25);

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

	.CarouselItem {
		height: 20rem;
	}

	.imgUpMorePost {
		width: 90px;
		height: 90px;
	}

	.MuiAutocomplete-endAdornment {
		display: none;
	}
`;

export const ModalStyle = styled.article`
	.img-modal {
		width: 70%;
	}
`;

export const MapStyle = styled.article`
	.map {
		height: 500px;
	}

	.mapboxgl-ctrl {
		height: 87px;
		width: 30px;
	}

	.mapboxgl-ctrl-bottom-right, .mapboxgl-ctrl-logo {
		display: none !important;
	}
`;

export const CommentStyle = styled.article`
	.comment-img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.comment {
		width: 500px;
		overflow: hidden;
	}
`;