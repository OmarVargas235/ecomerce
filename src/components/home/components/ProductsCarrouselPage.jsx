import React from 'react';

import { RedButton } from '../../../utils/styleMaterialUi';

import Carousel from 'react-material-ui-carousel';
import { Paper, Grid } from '@material-ui/core';

const ProductsCarrouselPage = ({ classes, history, products }) => (
	<Carousel 
		animation='slide'
		className="my-4"
	>
        {
            products.map( (item, i) => (
				<Paper key={i} square={true} className="py-4">
					<Grid container spacing={3}>
						<Grid item xs={5} className={`text-center ${classes.root}`}>
	          				<img
	          					src={`http://localhost:5000/${item.images[0]}`}
	          					alt={item.name}
	          					className="img-fluid img-carrousel"
	          				/>
	        			</Grid>

	        			<Grid item xs={7} className={classes.root}>
							<h2>{item.name}</h2>
							<p>{item.description}</p>
							
							<RedButton
								className="CheckButton"
								variant="contained"
								color="primary"
								onClick={() => history.push(`/producto/${item['_id']}`)}
							>
								Mas informacion
							</RedButton>
	        			</Grid>
					</Grid>
				</Paper>
            ))
        }
    </Carousel>	
)

export default ProductsCarrouselPage;