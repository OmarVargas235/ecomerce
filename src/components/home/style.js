import styled from 'styled-components';

export const ContainerHome = styled.main`
	.banner {
		position: relative;

		button {
			position: absolute;
			z-index: 1;
			bottom: 0;
			left: 50%;
			transform: translate(-50%, -50%);
			font-size: 30px;
			background-color: #e12727;
			font-family: "Montserrat", "HelveticaNeue", "Helvetica Neue", sans-serif;
		}

		.MuiButton-containedSecondary:hover {
	  		background-color: #e12727;
		}
	}

	.MuiButton-containedPrimary {
		&:hover {
			background-color: #212121 !important;
		}
	}

	.footer {
		background-color: white;
		
		.border-right {
			position: relative;

			&:before {
				background-color: #e2e2e2;
				content: "";
				display: block;
				margin-top: -32.5px;
				height: 65px;
				position: absolute;
				top: 50%;
				right: -10%;
				width: 1px;
			}
		}
	}

`;