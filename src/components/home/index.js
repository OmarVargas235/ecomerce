import React from 'react';

import HeaderPage from './components/HeaderPage';
import ProductsCarrouselPage from './components/ProductsCarrouselPage';
import ProductsCardPage from './components/ProductsCardPage';
import { ContainerHome } from './style';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#E12727',
		},
		secondary: {
			main: '#212121',
		},
	},
});

const Home = () => {

	const matches = useMediaQuery('(max-width: 767px)');
	const classes = useStyles();
	
	return (
		<ContainerHome>
			<HeaderPage
				matches={matches}
			/>

			<ProductsCarrouselPage
				classes={classes}
				theme={theme}
			/>
			
			<ProductsCardPage
				classes={classes}
				theme={theme}
			/>
		</ContainerHome>

	)
}

export default Home;