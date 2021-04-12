import React from 'react';
import CardProductHome from '../../../layaut/CardProductHome';
import { accessories } from '../../../utils/dataCardsHome';

import { Container, Grid } from '@material-ui/core';

const ProductsCardPage = ({ classes, theme }) => (
	<Container>	
		<h3 className="mb-4 text-center">Algunas de los accesorios que puedes encontrar</h3>
		
		<Grid container spacing={3}>
			{
				accessories.map((product) => (
					<Grid 
						item
						xs={12}
						sm={6}
						md={3}
						className={`d-flex justify-content-center ${classes.root}`}
						key={product.id}
					>
						<CardProductHome
							product={product}
						/>
			        </Grid>
				))
			}
		</Grid>
	</Container>
)

export default ProductsCardPage;