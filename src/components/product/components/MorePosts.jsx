import React from 'react';
import { withRouter } from 'react-router-dom';

import CardProduct from '../../../layaut/CardProduct';

import Carousel from 'react-material-ui-carousel';
import { Grid, Typography, Hidden, Button } from '@material-ui/core';

const MorePosts = ({ history, classes, items }) => (
	<React.Fragment>
		<Hidden mdUp>
			<Grid container>
				{
					[1,2].map((e, index) => (
						<React.Fragment key={index}>
							<Grid item xs={4} sm={3} className="mb-3">
								<img src={items[index].img} alt={items[index].name} className="imgUpMorePost" />
							</Grid>

							<Grid item xs={8} sm={9}>
								<Typography
									variant="body2"
									color="textSecondary"
									component="p"
								>
									{ items[index].name }
								</Typography>
							
								<Typography gutterBottom variant="h6" component="h2">
									${ items[index].price }
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

				<Button
					variant="text"
					color="primary"
					size="small"
					onClick={() => history.push("/productos/omar")}
				>Ver mas publicaciones de Omar</Button>
			</Grid>
		</Hidden>
		
		<Hidden smDown>
			<Carousel 
				animation='slide'
				autoPlay={false}
				navButtonsAlwaysVisible
				indicators={false}
			>
				{
					[1,2,3].map((el, index) => (
						<Grid container spacing={3} key={index}>
							{
								[1,2,3,4].map((product, index) => (
									<Grid item md={3} key={index}>
										<CardProduct
											classes={classes}
											data={items[index]}
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