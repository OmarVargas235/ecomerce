import React from 'react';

import { ProductStyle } from '../style';

import Carousel from 'react-material-ui-carousel';
import { Container, Grid, Paper } from '@material-ui/core';

const ProductPage = ({ items, productMemo }) => (
	<ProductStyle>
		<Container className="mt-5">
			<Grid container spacing={3}>
				<Grid item xs={8}>
					<div className="d-flex">
						<div className="mr-3">
							<div>img1</div>
							<div>img2</div>
							<div>img3</div>
							<div>img4</div>
							<div>img5</div>
						</div>

						<img src={productMemo.img} alt={productMemo.name} />
					</div>

					<Carousel 
						animation='slide'
						className="my-4"
						autoPlay={false}
					>
						img1
					</Carousel>	
				</Grid>

				<Grid item xs={4}>
					
				</Grid>
			</Grid>
		</Container>
	</ProductStyle>
)

export default ProductPage;