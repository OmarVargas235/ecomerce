import React from 'react';
import moment from 'moment';

import MenuThreePoints from '../../../layaut/MenuThreePoints';
import { styleMaterialUiTheme } from '../../../utils/styleMaterialUi';

import { Grid, Typography, Avatar, Button } from '@material-ui/core';
import { Card, CardHeader, CardContent, CardActions, CardMedia } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import { ThemeProvider } from '@material-ui/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const CardAdminPage = ({ addOrDeleteProduct=()=>{}, dataSelected, handleClick, isAdd=false, message="", point=0 }) => {

	const theme = styleMaterialUiTheme();
	const matches = useMediaQuery('(max-width: 415px)');

	return (
		<ThemeProvider theme={theme}>
			<Card className={`mt-5 ${matches ? '' : 'mx-5'}`} raised={true}>
				<CardHeader
					className="text-capitalize"
					avatar={
						dataSelected.idUser.img
						? <img className="img-user mb-3" src={`http://localhost:5000/${dataSelected.idUser.img}`}alt="img" />
						: <Avatar aria-label="recipe">
							{dataSelected.idUser.name.charAt(0).toUpperCase()}
						</Avatar>
					}
					action={
						isAdd ?
						<MenuThreePoints
							handleChange={addOrDeleteProduct}
							options={['Agregar al home', 'Quitar del home']}
						/> : null
					}
					title={dataSelected.idUser.name + ' ' + dataSelected.idUser.lastName}
					subheader={moment(new Date(), "YYYYMMDD").format('LL')}
				/>
				
				<CardMedia
					style={{height: 0, paddingTop: '46.25%'}}
					image={`http://localhost:5000/${dataSelected.images[0]}`}
					title={dataSelected.name}
			    />

				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						{dataSelected.description}
					</Typography>

					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
						className="mt-4 mb-3"
					>
						Precio: {dataSelected.price}
					</Typography>

					<Typography variant="body2" color="textSecondary" component="p">
						Stock: {dataSelected.stock}
					</Typography>
				</CardContent>
				
				
				<CardActions disableSpacing>
					<Grid item xs={6} sm={4}>
						<StarIcon color={`${point > 0 ? 'primary' : 'disabled'}`} />
						<StarIcon color={`${point > 1 ? 'primary' : 'disabled'}`} />
						<StarIcon color={`${point > 2 ? 'primary' : 'disabled'}`} />
						<StarIcon color={`${point > 3 ? 'primary' : 'disabled'}`} />
						<StarIcon color={`${point > 4 ? 'primary' : 'disabled'}`} />
					</Grid>
				</CardActions>
				
				{
					message.length === 0 ? null
					: <CardActions disableSpacing>
						 <Button
						 	size="small"
						 	color="secondary"
						 	fullWidth={true}
						 	variant="contained"
						 	onClick={handleClick}
						>{message}</Button>
					</CardActions>
				}
			</Card>
		</ThemeProvider>
	)
}

export default CardAdminPage;