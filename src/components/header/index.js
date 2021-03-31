import React from 'react';
import HeaderPage from './HeaderPage';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const Header = () => {

	const matches = useMediaQuery('(max-width: 767px)');
	
	return (
		<HeaderPage
			matches={matches}
		/>	
	)
}

export default Header;