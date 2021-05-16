import React from 'react';
import { withRouter } from 'react-router-dom';

import { RedLightButton } from '../utils/styleMaterialUi';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent } from '@material-ui/core';
import { CardMedia, Typography } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 140,
	},
});

const CardProductHome = ({ history, product }) => {

	const classes = useStyles();
	
	return (
		<Card 
			className={`d-flex flex-column justify-content-between w-100 ${classes.root}`}
			raised={true}
		>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={product.img}
					title={product.name}
				/>

				<CardContent>
					<Typography gutterBottom variant="h5" component="h2" align="center">
						{product.name}
					</Typography>

					<Typography gutterBottom variant="h6" component="h3" align="center">
						{product.price}
					</Typography>

					<Typography gutterBottom variant="h6" component="h4" align="center">
						{product.description}
					</Typography>
				</CardContent>
			</CardActionArea>
			
			<CardActions className="mb-sm-3">
				<RedLightButton
					onClick={() => history.push(`/producto/${product.id}`)}
					size="medium"
					color="primary"
					className="btn-block"
				>
					Mas informacion
				</RedLightButton>
			</CardActions>
		</Card>
	)
}

export default withRouter(CardProductHome);