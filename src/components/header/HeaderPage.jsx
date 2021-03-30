import React from 'react';

import { HeaderContainer } from './style';
import banner from '../../assets/img/banner.webp';

import Button from '@material-ui/core/Button';

const HeaderPage = () => (
	<HeaderContainer banner={banner}>
		<img src={banner} alt="banner" className="img-fluid" />
		<Button 
			variant="contained"
			color="secondary"
			className="text-capitalize px-5"
		>shop now</Button>
	</HeaderContainer>
)

export default HeaderPage;