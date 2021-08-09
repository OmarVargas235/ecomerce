import React from 'react';
import CardProduct from '../../../layaut/CardProduct';

import { Container, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const ProductsCardPage = ({ classes, products }) => (
	<Container>	
		<h3 className="mb-4 text-center">Algunas de los accesorios que puedes encontrar</h3>
		
		{
			products.length === 0
			? <Alert variant="filled" severity="info" className="mx-5">No hay productos</Alert>
			: <Grid container spacing={3}>
				{
					products.map((product) => (
						<Grid 
							item
							xs={12}
							sm={6}
							md={3}
							className={`d-flex justify-content-center ${classes.root}`}
							key={product['_id']}
						>
							<CardProduct
								product={product}
							/>
				        </Grid>
					))
				}
			</Grid>
		}
	</Container>
)

export default ProductsCardPage;