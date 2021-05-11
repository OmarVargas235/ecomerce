import styled from 'styled-components';

export const NavbarContainer = styled.nav`
	position: relative;

	.icon-close {
		width: 35px;
		height: 35px;
		fill: black;
	}

	.icon {
		width: 27px;
		height: 27px;
	}

	.img-logo {
		width: 60px;
		height: 60px;
		cursor: pointer;
	}

	.MuiPaper-elevation1 {
		box-shadow: none;
	}

	.container-icon {
		position: relative;

		::after {
			display: block;
			content: '';
			background-color: #DD473E;
			width: 0%;
			height: 4px;
			position: absolute;
			left: 50%;
			top: 140%;
			transition: width .1s ease-out, left .1s ease-out;
		}

		&:hover::after {
			width: 80%;
			left: 20%;
		}
	}

	.MuiAppBar-colorPrimary {
		background-color: black;
	}
`;

// =====================================
// Estilos de la barra de busqueda
// =====================================

const animationOpacity = (typeAnimation, opacity) => {

	let templete = '', porcent = 0;

	templete += `@keyframes ${typeAnimation} {`;

	for (let i = 0; i < 5; i++) {

		templete += `${porcent}% { opacity: ${opacity}; }`;
		porcent += 25;
		typeAnimation === 'searchAnimateEnter' ? opacity += .25 : opacity -= .25;
	}

	templete += `}`;

	return templete;
}

export const SearchContainer = styled.div`
	position: absolute;
	z-index: 1100;
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
				: animationOpacity('searchAnimateOut', 1)
	}

	@media (max-width: 767px) {
		height: 96px;
	}
`;

// =====================================
// Estilos del carrito de compras
// =====================================

export const CartStyle = styled.div`
	img {
		width: 75px;
		height: 75px;
	}

	.close-icon {
		fill: rgb(239, 53, 52);
		cursor: pointer;
	}

	.price, .total-pay {
		white-space: nowrap;
		width: 90px; 
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.total-pay {
		width: 120px; 
	}

	.incrementAndDecrement {
		border-top: 1px solid #343535;
		border-bottom: 1px solid #343535;
		max-width: 73px;
		max-height: 22px;
		
		span {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 20px;
			border-right: 1px solid #343535;
			border-left: 1px solid #343535;
			cursor: pointer;
			background-color: white;
		}

		input {
			text-align: center;
			width: 33px;
			outline: none;
			border: none;
		}
	}

	.total_to_pay {
		width: 290px;
		position: absolute;
		bottom: 20px;
	}
`;