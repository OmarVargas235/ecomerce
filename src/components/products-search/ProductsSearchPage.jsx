import React from 'react';

import CardProduct from '../../layaut/CardProduct';

import { Grid, Container } from '@material-ui/core';

const ProductsSearchPage = ({ history, products }) => (
	<Container>
		{
			products.length === 0 ? <div className="mt-5 text-center">No hay resultados</div>
			: <Grid container spacing={1} className="mt-5">
				{
					products.map((product, index) => (
						<Grid 
							item
							xs={12}
							sm={6}
							md={3}
							className='d-flex justify-content-center'
							key={index}
						>
							<CardProduct
								history={history}
								product={product}
							/>
				        </Grid>
					))
				}
			</Grid>
		}
	</Container>
)

export default ProductsSearchPage;