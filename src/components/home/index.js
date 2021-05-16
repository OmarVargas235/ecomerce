import React from 'react';

import HeaderPage from './components/HeaderPage';
import ProductsCarrouselPage from './components/ProductsCarrouselPage';
import ProductsCardPage from './components/ProductsCardPage';
import Footer from './components/Footer';
import { ContainerHome } from './style';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));

const Home = ({ history }) => {

	const matches = useMediaQuery('(max-width: 767px)');
	const classes = useStyles();
	
	return (
		<ContainerHome>
			<HeaderPage
				matches={matches}
			/>
			
			<ProductsCarrouselPage
				history={history}
				classes={classes}
			/>
			
			<ProductsCardPage
				classes={classes}
			/>
			
			<Footer />
			
		</ContainerHome>

	)
}

export default Home;