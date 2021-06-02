import React from 'react';

import { Grid, Button } from '@material-ui/core';
import { Card, CardContent, CardActions, Typography } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const AddToCartPage = ({ auth, addFavorite, addCart, classes, changeIconFavorite, contProduct, isAuthenticated, product, turn }) => (
	<Card className={classes.root} variant="outlined">
		<CardContent>
			<Grid container spacing={3}>
				<Grid item xs={10}>
					<Typography
						variant="h5"
						component="h6"
						className="font-weight-bold text-capitalize"
					>
						{product.name}
					</Typography>
				</Grid>
				
				<Grid item xs={2} className={classes.containerFavorite}>
					{
						!isAuthenticated ?  <FavoriteBorderIcon color="primary" />
						:<React.Fragment>
							{
								!changeIconFavorite ? <FavoriteBorderIcon
									color="primary"
									className={`pointer ${turn ? classes.favorite : classes.favoriteTurn}`}
									onClick={addFavorite}
								/>
								: <FavoriteIcon
									color="primary"
									className={`pointer ${turn ? classes.favorite : classes.favoriteTurn}`}
									onClick={addFavorite}
								/>
							}
						</React.Fragment>
					}
				</Grid>
			</Grid>

			<Typography variant="h4" component="h5" className="my-4 font-weight-light">
				Bs {product.price}
			</Typography>
			
			<Typography variant="body2" component="h5">
				Cantidad {!contProduct ? 0 : contProduct.cont}
			</Typography>

			<Typography variant="body2" component="p" className="my-4">
				Disponibles {product.stock}
			</Typography>
		</CardContent>

		<CardActions>
			<Button
				fullWidth
				variant="contained"
				color="primary"
				onClick={addCart}
			>Añadir al carrito</Button>
		</CardActions>
	</Card>
);

export default AddToCartPage;