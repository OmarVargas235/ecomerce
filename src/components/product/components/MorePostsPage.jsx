import React from 'react';
import { withRouter } from 'react-router-dom';

import CardWithoutButton from '../../../layaut/CardWithoutButton';
import Spinner from '../../../layaut/Spinner';

import Carousel from 'react-material-ui-carousel';
import { Grid, Typography, Hidden, Button } from '@material-ui/core';

const MorePostsPage = ({ classes, history, idUser, products }) => (
	<React.Fragment>
		<Hidden mdUp>
			<Grid container>
				{
					products.length === 0 ? <Spinner />
					: <React.Fragment>
						{			
							products[0].map((product) => (

								<React.Fragment key={product['_id']}>
									<Grid item xs={4} sm={3} className="mb-3">
										{
											product.images.length === 0 ? <Spinner />
											: <img
												src={product.images[0].url}
												alt={product.name}
												className="imgUpMorePost"
											/>
										}
									</Grid>

									<Grid item xs={8} sm={9}>
										<Typography
											variant="body2"
											color="textSecondary"
											component="p"
										>
											{ product.name }
										</Typography>
									
										<Typography gutterBottom variant="h6" component="h2">
											$ { product.price }
										</Typography>
									
										<Typography
											variant="body2"
											color="textSecondary"
											className="text-green"
										>
											Envio gratis
										</Typography>
									</Grid>
								</React.Fragment>
							))
						}
					</React.Fragment>
				}

				<Button
					variant="text"
					color="primary"
					size="small"
					onClick={() => history.push(`/productos/${idUser}`)}
				>Ver mas publicaciones de Omar</Button>
			</Grid>
		</Hidden>
		
		<Hidden smDown>
			<Carousel 
				animation='slide'
				autoPlay={false}
				// navButtonsAlwaysVisible
				indicators={false}
			>
				{
					products.map((product, index) => (
						<Grid container spacing={3} key={index}>
							{
								product.map(product => (
									<Grid item md={3} key={product['_id']}>
										<CardWithoutButton
											classes={classes}
											data={product}
											history={history}
										/>
									</Grid>
								))
							}
						</Grid>
					))
				}
			</Carousel>
		</Hidden>
	</React.Fragment>
)

export default withRouter(MorePostsPage);