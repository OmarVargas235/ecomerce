import React from 'react';

import { ProductStyle } from '../style';
import Gallery from '../container/Gallery';
import Chat from '../container/Chat';
import MorePosts from './MorePosts';
import AddToCart from './AddToCart';
import Map from './Map';

import { Container, Grid, Divider, Typography, Hidden  } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const ProductPage = ({ classes, items, productMemo, theme }) => (
	<ProductStyle className="my-5 mx-2 mx-sm-5 py-5">
		<ThemeProvider theme={theme}>
			<Container maxWidth="lg">
				<Grid container spacing={3}>
					<Grid item sm={12} md={8}>
						
						<Gallery
							img={productMemo.img}
							items={items}
							name={productMemo.name}
						/>

						<Divider className="my-5" />
						
						<Hidden mdUp>
							<AddToCart classes={classes} />
						</Hidden>
						
						<h4 className="my-4">Mas publicaciones de Omar</h4>
						
						<MorePosts
							classes={classes}
							items={items}
						/>

						<Hidden mdUp>
							<Divider className="my-4" />
							<Map classes={classes} />
						</Hidden>
						
						<Divider className="my-4" />
			
						<h3 className="mb-4">Descripción</h3>

						<Typography variant="body1">Juego de dardos magnéticosCod 22611,99 americanosEl set contiene: un tablero de 14” y 6 dados (3 amarillos y 3 rojos). Es un juego de dardos perfecto para principiantes. Ideal para niños y adultos. Diseñado con punta de dardos magnética de alta calidad. Los dardos cambian la punta afilada habitual por una punta magnética, lo que los hace seguros para los jugadores más jóvenes.. Posee un diseño de cuerpo ligero, que lo hace fácil de utilizar, brindando comodidad. Material: Imán + plástico. Peso: 400 grDIMENSIONES:Tablero: 34.5x34.5 cm. Dardos : 8 cmDESCRIPCIÓN:COLOR: Juego de colores: Amarillo con rojo, verde y negro</Typography>
						
						
						<Divider className="my-4" />

						<Chat
							classes={classes}
							theme={theme}
						/>
					</Grid>

					<Grid item sm={12} md={4}>
						
						<Hidden smDown>
							<AddToCart classes={classes} />
							<Map classes={classes} />
						</Hidden>
					</Grid>
				</Grid>
			</Container>
		</ThemeProvider>
	</ProductStyle>
)

export default ProductPage;