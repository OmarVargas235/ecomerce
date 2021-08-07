import React from 'react';
import moment from 'moment';

import SelectionMenu from '../../../layaut/SelectionMenu';
import Spinner from '../../../layaut/Spinner';
import MenuThreePoints from '../../../layaut/MenuThreePoints';

import { Container, Grid, Typography, Avatar } from '@material-ui/core';
import { Card, CardHeader, CardContent, CardActions, CardMedia } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import { ThemeProvider } from '@material-ui/styles';

const AddProductHomePage = ({ data, handleChange, loading, matches, point, product, selectedOption, theme }) => (

	<Container maxWidth="sm" className="my-5">
		{
			loading ? <Spinner />
			: <ThemeProvider theme={theme}>
				<SelectionMenu
					categorys={data.map(product => product.name)}
					value={data.map(product => product['_id'])}
					title="Seleccionar un producto"
					setChange={handleChange}
				/>
				
				{
					!product.name ? null
					: <Card className={`mt-5 ${matches ? '' : 'mx-5'}`} raised={true}>
						<CardHeader
							avatar={
								product.idUser.img
								? <img className="img-user mb-3" src={`http://localhost:5000/${product.idUser.img}`}alt="img" />
								: <Avatar aria-label="recipe">
									{product.idUser.name.charAt(0).toUpperCase()}
								</Avatar>
							}
							action={
								<MenuThreePoints
									handleChange={selectedOption}
									options={['Agregar al home', 'Quitar del home']}
								/>
							}
							title={product.idUser.name + ' ' + product.idUser.lastName}
							subheader={moment(new Date(), "YYYYMMDD").format('LL')}
						/>
						
						<CardMedia
							style={{height: 0, paddingTop: '46.25%'}}
							image={`http://localhost:5000/${product.images[0]}`}
							title={product.name}
					    />

						<CardContent>
							<Typography variant="body2" color="textSecondary" component="p">
								{product.description}
							</Typography>

							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
								className="mt-4 mb-3"
							>
								Precio: {product.price}
							</Typography>

							<Typography variant="body2" color="textSecondary" component="p">
								Stock: {product.stock}
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
					</Card>
				}
			</ThemeProvider>
		}
	</Container>
)

export default AddProductHomePage;