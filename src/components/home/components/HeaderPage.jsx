import React from 'react';

import banner from '../../../assets/img/banner.webp';
import bannerMobile from '../../../assets/img/banner_Mobile.jpg';

import Button from '@material-ui/core/Button';

const HeaderPage = ({ matches }) => (
	<header className="banner">
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
	</header>
)

export default HeaderPage;