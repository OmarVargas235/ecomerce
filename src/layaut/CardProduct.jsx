import React from 'react';

import { Card, CardContent, CardActionArea, CardMedia } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const CardProduct = ({ classes, data }) => {
	
	return (
		<Card raised={true} className={classes.card}>
			<CardActionArea>
				<CardMedia
					component="img"
					alt="Contemplative Reptile"
					height="140"
					image={data.img}
					title={data.id}
				/>

				<CardContent>
					<Typography gutterBottom variant="h6" component="h2">
						${ data.price }
					</Typography>

					<Typography
						variant="body2"
						color="textSecondary"
						className="text-green"
					>
						Envio gratis
					</Typography>

					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
					>
						{ data.name }
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

export default CardProduct;