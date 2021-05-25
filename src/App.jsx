import React from 'react';
import { createGlobalStyle } from 'styled-components';

import './assets/bootstrap.css';
import RouterApp from './routers/RouterApp';

const Body = createGlobalStyle`
	main, section {
		background-color: #EDEDED;
	}

	.img-user {
		width: 35px;
		height: 35px;
		border-radius: 50%;
	}
`;

const App = () => {
	
	return (
		<React.Fragment>
			<Body />

			<RouterApp />
		</React.Fragment>
	)
}

export default App;