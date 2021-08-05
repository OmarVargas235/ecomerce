import React from 'react';

import { MoreProductsStyle } from '../style';
import CardWithoutButton from '../../../layaut/CardWithoutButton';
import AccordionPage from './AccordionPage';

import { Grid, Container } from '@material-ui/core';

const MoreProductsPage = ({ classes, handleChange, history, order, products }) => (
	<MoreProductsStyle className="mt-5">
		<Container className={classes.root}>
			
			{
				products.length === 0 ? <div className="text-center">Sin productos</div>
				: <React.Fragment>
					<AccordionPage
						classes={classes}
						handleChange={handleChange}
						order={order}
					/>		
					
					<Grid container spacing={3} className="products_cards">
						{
							products.map((product, index) => (
								<Grid item key={index} xs={12} sm={3} md={2}>
									<CardWithoutButton
										classes={classes}
										data={product}
										history={history}
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