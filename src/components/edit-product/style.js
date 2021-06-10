import styled from 'styled-components';

export const EditProductStyle = styled.section`
	background-color: white;

	@media (max-width: 767px) and (min-width: 600px) {
		.mr-5 {
			margin-right: 0 !important;
		}
	}

	@media (max-width: 502px) {
		.mr-5 {
			margin-right: 0 !important;
		}
	}
`;

export const MapStyle = styled.article`
	.map {
		height: 300px;
	}

	.mapboxgl-ctrl {
		height: 87px;
		width: 30px;
	}

	.mapboxgl-ctrl-bottom-right, .mapboxgl-ctrl-logo {
		display: none !important;
	}
`;