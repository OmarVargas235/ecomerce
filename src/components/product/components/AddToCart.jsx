import React from 'react';

import { Grid, Button } from '@material-ui/core';
import { Card, CardContent, CardActions, Typography } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const AddToCart = ({ classes }) => (
	<Card className={classes.root} variant="outlined">
		<CardContent>
			<Grid container spacing={3}>
				<Grid item xs={10}>
					<Typography
						variant="h5"
						component="h6"
						className="font-weight-bold"
					>
						Juego De Dardos MagnéticosCod 226
					</Typography>
				</Grid>
				
				<Grid item xs={2} style={{
						perspective: '1000px',
				}}>
					<FavoriteBorderIcon
						color="error"
						className="pointer"
						style={{
							transformStyle: 'preserve-3d',
							transform: 'rotateY(180deg)',
						}}
					/>

					<FavoriteIcon
						color="error"
						className="pointer"
						style={{
							transformStyle: 'preserve-3d',
							transform: 'rotateY(180deg)',
						}}
					/>
				</Grid>
			</Grid>

			<Typography variant="h4" component="h5" className="my-4 font-weight-light">
				Bs.25.550.690
			</Typography>

			<Typography variant="body2" component="h5">
				Cantidad 1
			</Typography>

			<Typography variant="body2" component="p" className="my-4">
				Disponibles 6
			</Typography>
		</CardContent>

		<CardActions>
			<Button
				fullWidth
				variant="contained"
				color="primary"
			>Añadir al carrito</Button>
		</CardActions>
	</Card>
)

export default AddToCart;