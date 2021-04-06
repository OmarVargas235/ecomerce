import React from 'react';

import { ProductStyle } from '../style';
import CardProduct from '../../../layaut/CardProduct';
import Gallery from '../container/Gallery';
import Chat from '../container/Chat';

import Carousel from 'react-material-ui-carousel';
import { Container, Grid, Button, Divider } from '@material-ui/core';
import { Card, CardContent, CardActions, Typography } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import { ThemeProvider } from '@material-ui/styles';

const ProductPage = ({ classes, items, productMemo, theme }) => (
	<ProductStyle className="m-5 py-5">
		<ThemeProvider theme={theme}>
			<Container>
				<Grid container spacing={3}>
					<Grid item xs={8}>
						
						<Gallery
							img={productMemo.img}
							items={items}
							name={productMemo.name}
						/>

						<Divider className="my-5" />
						
						<h4 className="mb-4">Mas publicaciones de Omar</h4>

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
												<Grid item sm={6} md={3} key={index}>
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
						
						<Divider className="my-4" />

						<div>
							<h3 className="mb-4">Descripción</h3>

							<Typography variant="body1">Juego de dardos magnéticosCod 22611,99 americanosEl set contiene: un tablero de 14” y 6 dados (3 amarillos y 3 rojos). Es un juego de dardos perfecto para principiantes. Ideal para niños y adultos. Diseñado con punta de dardos magnética de alta calidad. Los dardos cambian la punta afilada habitual por una punta magnética, lo que los hace seguros para los jugadores más jóvenes.. Posee un diseño de cuerpo ligero, que lo hace fácil de utilizar, brindando comodidad. Material: Imán + plástico. Peso: 400 grDIMENSIONES:Tablero: 34.5x34.5 cm. Dardos : 8 cmDESCRIPCIÓN:COLOR: Juego de colores: Amarillo con rojo, verde y negro</Typography>
						</div>
						
						<Divider className="my-4" />

						<Chat
							classes={classes}
							theme={theme}
						/>
					</Grid>

					<Grid item xs={4}>
						<Card className={classes.root} variant="outlined">
							<CardContent>
								<Grid container spacing={3}>
									<Grid item xs={10}>
										<Typography variant="h5" component="h6">
											Juego De Dardos MagnéticosCod 226
										</Typography>
									</Grid>
									
									<Grid item xs={2}>
										<FavoriteBorderIcon
											color="disabled"
											className="pointer"
										/>
									</Grid>
								</Grid>

								<Typography variant="h6" component="h5" className="my-4">
									Bs.25.550.690
								</Typography>

								<Typography variant="body2" color="textSecondary" component="h5">
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

						<Card className={`mt-4 ${classes.root}`} variant="outlined">
							
							 <Typography variant="h6" component="h5">
					        	Informacion del vendedor
					        </Typography>

							<CardContent>
								<StarOutlineIcon color="disabled" />
								<StarOutlineIcon color="disabled" />
								<StarOutlineIcon color="disabled" />
								<StarOutlineIcon color="disabled" />
								<StarOutlineIcon color="disabled" />
							</CardContent>

							<CardActions>
								mapa
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			</Container>
		</ThemeProvider>
	</ProductStyle>
)

export default ProductPage;