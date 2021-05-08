import React from 'react';

import HeaderPage from './components/HeaderPage';
import ProductsCarrouselPage from './components/ProductsCarrouselPage';
import ProductsCardPage from './components/ProductsCardPage';
import Footer from './components/Footer';
import { ContainerHome } from './style';
import { styleMaterialUiTheme } from '../../utils/styleMaterialUi';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));

const Home = ({ history }) => {

	const matches = useMediaQuery('(max-width: 767px)');
	const classes = useStyles();

	const [ theme ] = styleMaterialUiTheme();
	
	return (
		<ContainerHome>
			<HeaderPage
				matches={matches}
			/>
			
			<ThemeProvider theme={theme}>
				<ProductsCarrouselPage
					history={history}
					classes={classes}
					theme={theme}
				/>
				
				<ProductsCardPage
					classes={classes}
				/>
				
				<Footer />
			</ThemeProvider>
		</ContainerHome>

	)
}

export default Home;