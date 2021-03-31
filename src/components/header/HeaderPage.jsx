import React from 'react';

import { HeaderContainer } from './style';
import banner from '../../assets/img/banner.webp';
import bannerMobile from '../../assets/img/banner_Mobile.jpg';

import Button from '@material-ui/core/Button';

const HeaderPage = ({ matches }) => (
	<HeaderContainer banner={banner}>
		{
			matches 
				? <img src={bannerMobile} alt="banner" className="img-fluid w-100" />
				: <img src={banner} alt="banner" className="img-fluid" />
		}
		
		<Button
			variant="contained"
			color="secondary"
			className="text-capitalize px-5"
		>shop now</Button>
	</HeaderContainer>
)

export default HeaderPage;