import React from 'react';

import { CardWithoutButtonPriceStyle } from './style';
import Spinner from './Spinner';

import { Card, CardContent, CardActionArea, CardMedia } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const CardWithoutButton = ({ classes, data={}, history={}, idUser, moreProducts=false }) => {

	const handleClick = () => {

		moreProducts
		? history.push(`/productos/${idUser}`)
		: history.push(`/producto/${data['_id']}`);
	}

	return (
		<Card raised={true} className={classes.card}>
			<CardActionArea onClick={handleClick}>
				{
					data.images.length === 0 ? <Spinner />
					: <CardMedia
						component="img"
						alt="Contemplative Reptile"
						height="140"
						image={data.images[0].url}
						title={data.id}
					/>
				}

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
}

export default CardWithoutButton;