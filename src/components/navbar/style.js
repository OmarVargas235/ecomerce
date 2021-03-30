import styled from 'styled-components';

export const NavbarContainer = styled.nav`
	position: relative;

	svg {
		width: 20px;
		height: 20px;
		position: relative;

		// &::before {
		// 	display: block;
		// 	content: '';
		// 	background-color: red;
		// 	width: 100px;
		// 	height: 100px;
		// 	position: absolute;
		// 	top: 0;
		// }
	}

	.img-logo {
		width: 60px;
		height: 60px;
		cursor: pointer;
	}

	.MuiPaper-elevation1 {
		box-shadow: none;
	}
`;

// =====================================
// Estilos de la barra de busqueda
// =====================================

// const animationOpacity = (typeAnimation) => (`
// 	@keyframes ${typeAnimation} {
// 		0% {
// 			opacity: 0;
// 		}

// 		25% {
// 			opacity: .25;
// 		}

// 		50% {
// 			opacity: .5;
// 		}

// 		75% {
// 			opacity: .75;
// 		}

// 		100% {
// 			opacity: 1;
// 		}
// 	}
// `)

const animationOpacity = (typeAnimation, opacity) => {

	let percent = 0, templete = '';

	return (`
		@keyframes ${typeAnimation} {
			${() => {
				for (let i = 0; i < 4; i++) {

					templete += `${percent}% {
						opacity: ${opacity};
					}`

					percent += 25;
					opacity += .25;
				}

				console.log(templete)
				return templete;
			}}
		}
	`);
}

export const SearchContainer = styled.div`
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: white;

	.container-icon-search {
		width: 40px;
		height: 40px;
		background-color: #1C1D1D;
		transition: background-color .2s;
		cursor: pointer;

		svg {
			fill: white;
			width: 15px;
			height: 15px;
		}

		&:hover {
			background-color: #3A3C3C;
		}
	}

	.container-icon-close {
		width: 40px;
		height: 40px;
	}

	.MuiGrid-root {
		animation: ${props => props.animationEnter ? 'searchAnimateEnter' : 'searchAnimateOut'} .5s ease-in-out;
	}

	.MuiInputBase-input {
		background-color: #F6F6F6;
		height: 29px;
		padding-left: 1rem;
	}

	.MuiFormLabel-root {
		color: black;
		z-index: 1;
		margin-left: 1rem;
	}

	${props => props.animationEnter 
				? animationOpacity('searchAnimateEnter', 0) 
				: animationOpacity('searchAnimateOut')
	}

	// @keyframes searchAnimateOut {
	// 	0% {
	// 		opacity: 1;
	// 	}

	// 	25% {
	// 		opacity: .75;
	// 	}

	// 	50% {
	// 		opacity: .5;
	// 	}

	// 	75% {
	// 		opacity: .25;
	// 	}

	// 	100% {
	// 		opacity: 0;
	// 	}
	// }
`;