import React from 'react';
import { withRouter } from 'react-router-dom';

import CardWithoutButton from '../../../layaut/CardWithoutButton';

import Carousel from 'react-material-ui-carousel';
import { Grid, Typography, Hidden, Button } from '@material-ui/core';

const MorePosts = ({ classes, history, idUser, products }) => (
	<React.Fragment>
		<Hidden mdUp>
			<Grid container>
				{
					products.map((e, index) => {
						
						if (index < 3) {

							return (
								<React.Fragment key={index}>
									<Grid item xs={4} sm={3} className="mb-3">
										<img
											src={`http://localhost:5000/${products[index]?.img}`}
											alt={products[index]?.name}
											className="imgUpMorePost"
										/>
									</Grid>

									<Grid item xs={8} sm={9}>
										<Typography
											variant="body2"
											color="textSecondary"
											component="p"
										>
											{ products[index]?.name }
										</Typography>
									
										<Typography gutterBottom variant="h6" component="h2">
											$ { products[index]?.price }
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
							)
						}

						return null;
					})
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
					products.map((el, index) => (
						<Grid container spacing={3} key={index}>
							{
								[1,2,3,4].map((product, index) => (
									<Grid item md={3} key={index}>
										<CardWithoutButton
											classes={classes}
											data={products[index]}
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

export default withRouter(MorePosts);