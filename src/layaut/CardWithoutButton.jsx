import React from 'react';

import { CardWithoutButtonPriceStyle } from './style';

import { Card, CardContent, CardActionArea, CardMedia } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const CardWithoutButton = ({ classes, data={}, history={} }) => (
	<Card raised={true} className={classes.card}>
		<CardActionArea onClick={() => history.push(`/producto/${data['_id']}`)}>
			<CardMedia
				component="img"
				alt="Contemplative Reptile"
				height="140"
				image={`http://localhost:5000/${data.images[0]}`}
				title={data.id}
			/>

			<CardContent>
				<Typography gutterBottom variant="h6" component="h2">
					<CardWithoutButtonPriceStyle>
						${ data.price }
					</CardWithoutButtonPriceStyle>
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

export default CardWithoutButton;