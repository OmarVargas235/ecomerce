import React from 'react';

import { MoreProductsStyle } from '../style';
import CardWithoutButton from '../../../layaut/CardWithoutButton';
import AccordionPage from './AccordionPage';

import { Grid, Container } from '@material-ui/core';

const MoreProductsPage = ({ classes, products }) => (
	<MoreProductsStyle className="mt-5">
		<Container className={classes.root}>
			
			{
				products.length === 0 ? <div className="text-center">Sin productos</div>
				: <React.Fragment>
					<AccordionPage
						classes={classes}
					/>		
					
					<Grid container spacing={3} className="products_cards">
						{
							products.map((product, index) => (
								<Grid item xs={12} sm={3} md={2} key={index}>
									<CardWithoutButton
										classes={classes}
										data={product}
									/>
								</Grid>
							))
						}
					</Grid>
				</React.Fragment>
			}
		</Container>
	</MoreProductsStyle>
)

export default MoreProductsPage;