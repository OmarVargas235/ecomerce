import React from 'react';

import { items } from '../../../utils/dataCarrouselHome';

import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const ProductsCarrouselPage = ({ history, classes, theme }) => (
	<Carousel 
		animation='slide'
		className="my-4"
	>
        {
            items.map( (item, i) => (
				<Paper key={i} square={true}>
					<Grid container spacing={3}>
						<Grid item xs={5} className={`text-center ${classes.root}`}>
	          				<img src={item.img} alt={item.name} className="img-fluid" />
	        			</Grid>

	        			<Grid item xs={7} className={classes.root}>
							<h2>{item.name}</h2>
							<p>{item.description}</p>
							
							<ThemeProvider theme={theme}>
								<Button
									className="CheckButton"
									variant="contained"
									color="primary"
									onClick={() => history.push(`/product/${item.id}`)}
								>
									Mas informacion
								</Button>
							</ThemeProvider>
	        			</Grid>
					</Grid>
				</Paper>
            ))
        }
    </Carousel>	
)

export default ProductsCarrouselPage;