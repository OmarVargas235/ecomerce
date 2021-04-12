import styled from 'styled-components';

export const ContainerHome = styled.main`
	.banner {
		position: relative;

		button {
			position: absolute;
			background-color: #e12727;
			bottom: 0;
			left: 50%;
			z-index: 1;
			transform: translate(-50%, -50%);
			font-size: 30px;
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
				position: absolute;
				background-color: #e2e2e2;
				content: "";
				display: block;
				margin-top: -32.5px;
				height: 65px;
				top: 50%;
				right: -10%;
				width: 1px;
			}
		}
	}

`;