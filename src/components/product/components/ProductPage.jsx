import React from 'react';

import { ProductStyle } from '../style';
import CardProduct from '../../../layaut/CardProduct';

import Carousel from 'react-material-ui-carousel';
import { Container, Grid, TextField, Button } from '@material-ui/core';
import { Card, CardContent, CardActions } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

const ProductPage = ({ classes, items, productMemo }) => (
	<ProductStyle className="m-5 py-5">
		<Container>
			<Grid container spacing={3}>
				<Grid item xs={8}>
					<div className="d-flex">
						<div className="mr-3">
							<div>img1</div>
							<div>img2</div>
							<div>img3</div>
							<div>img4</div>
							<div>img5</div>
						</div>

						<img src={productMemo.img} alt={productMemo.name} />
					</div>
					
					<h4 className="mt-5">Mas publicaciones de Omar</h4>

					<Carousel 
						animation='slide'
						className="my-4"
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
													data={items[index]}
												/>
											</Grid>
										))
									}
								</Grid>
							))
						}
					</Carousel>

					<div>
						<h3>Descripción</h3>

						<p>Juego de dardos magnéticosCod 22611,99 americanosEl set contiene: un tablero de 14” y 6 dados (3 amarillos y 3 rojos). Es un juego de dardos perfecto para principiantes. Ideal para niños y adultos. Diseñado con punta de dardos magnética de alta calidad. Los dardos cambian la punta afilada habitual por una punta magnética, lo que los hace seguros para los jugadores más jóvenes.. Posee un diseño de cuerpo ligero, que lo hace fácil de utilizar, brindando comodidad. Material: Imán + plástico. Peso: 400 grDIMENSIONES:Tablero: 34.5x34.5 cm. Dardos : 8 cmDESCRIPCIÓN:COLOR: Juego de colores: Amarillo con rojo, verde y negro</p>
					</div>

					<div className="mt-5 chat">
						<h3>Preguntas y Respuesta</h3>

						<h5>Pregunte a Omar</h5>

						<form className={classes.root} noValidate autoComplete="off">
							<TextField id="standard-basic" label="Standard" />

							<Button variant="contained" color="secondary">
							  	Secondary
							</Button>
					    </form>
					</div>
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
	</ProductStyle>
)

export default ProductPage;