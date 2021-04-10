import React from 'react';

import { MoreProductsStyle } from '../style';
import { items } from '../../../utils/dataProducts';
import CardProduct from '../../../layaut/CardProduct';
import AccordionPage from './AccordionPage';

import { Grid, Container } from '@material-ui/core';

const MoreProductsPage = ({ classes }) => (
	<MoreProductsStyle className="mt-5">
		<Container className={classes.root}>
			
			<AccordionPage
				classes={classes}
			/>		
	
			<Grid container spacing={3} className="products_cards">
				{
					items.map((product, index) => (
						<Grid item xs={12} sm={3} md={2} key={index}>
							<CardProduct
								classes={classes}
								data={product}
							/>
						</Grid>
					))
				}
			</Grid>
		</Container>
	</MoreProductsStyle>
)

export default MoreProductsPage;