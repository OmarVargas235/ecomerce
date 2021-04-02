import styled from 'styled-components';

export const RegisterContainer = styled.section`
	min-height: 85vh;
	
	form {
		box-shadow: 0 1px 3px rgba(0,0,0,.2);
		border-radius: 4px;
		background-color: white;
	}

	.MuiInputBase-root {
		background-color: #F6F6F6;
	}

	.MuiFormLabel-root {
		z-index: 1;
		margin-left: 1rem;
	}

	@media (max-width: 576px) {
		margin-top: 2rem;

		.MuiTextField-root {
			width: 100%;
		}
	}
`;