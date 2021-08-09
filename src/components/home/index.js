import React from 'react';

import HeaderPage from './components/HeaderPage';
import ProductsCarrouselPage from './components/ProductsCarrouselPage';
import ProductsCardPage from './components/ProductsCardPage';
import Footer from './components/Footer';
import { ContainerHome } from './style';
import { useFetch } from '../../customHooks/useFetch';
import Spinner from '../../layaut/Spinner';

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

	const { data, loading } = useFetch('get-products-home', true);
	
	return (
		<ContainerHome>
			<HeaderPage
				matches={matches}
			/>

			{
				loading ? <Spinner />
				: <React.Fragment>
					
					<ProductsCarrouselPage
						classes={classes}
						history={history}
						products={data.slice(0, 5)}
					/>
					
					<ProductsCardPage
						classes={classes}
						products={data.slice(5, 9)}
					/>
					
					<Footer />
				</React.Fragment>
			}
			
		</ContainerHome>

	)
}

export default Home;