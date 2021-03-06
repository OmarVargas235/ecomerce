import React from 'react';

import { ProductStyle } from '../style';
import Spinner from '../../../layaut/Spinner';
import Gallery from '../container/Gallery';
import Qualification from '../container/Qualification';
import ChatProduct from '../container/ChatProduct';
import MorePosts from '../container/MorePosts';
import AddToCart from '../container/AddToCart';
import Map from '../container/Map';

import { Container, Grid, Divider, Typography, Hidden  } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const ProductPage = ({ auth, classes, dataUser, product={}, products=[], theme, url }) => (
	<React.Fragment>
		{
			Object.keys(product).length === 0 ? <Spinner />
			: <ProductStyle className="my-5 mx-2 mx-sm-5 py-5">	
				<ThemeProvider theme={theme}>
					<Container maxWidth="lg">
						<Grid container spacing={3}>
							<Grid item sm={12} md={8}>
								<Gallery
									product={product}
								/>

								<Divider className="my-5" />
								
								<Hidden mdUp>
									<AddToCart
										product={product}
										url={url}
									/>
								</Hidden>

								<h4 className="my-4">Mas publicaciones de
								<span className="text-capitalize"> {product.user.name}</span></h4>
								
								{
									products.length === 0 ? <div className="text-center">Sin productos</div>
									: <MorePosts
										classes={classes}
										idUser={product.user['_id']}
										products={products}
									/>
								}

								<Hidden mdUp>
									<Divider className="my-4" />
									<Map
										classes={classes}
										pointStart={product.location}
									/>
								</Hidden>
								
								<Divider className="my-4" />
					
								<h3 className="mb-4">Descripción</h3>

								<Typography variant="body1">
									{product.description}
								</Typography>

								<Divider className="my-4" />
								
								<Qualification
									auth={auth}
									classes={classes}
									dataUser={dataUser}
									id={product['_id']}
									product={product}
									url={url}
								/>

								<ChatProduct
									auth={auth}
									ownerProduct={product.user.name}
									user={dataUser}
								/>
							</Grid>

							<Grid item sm={12} md={4}>
								
								<Hidden smDown>
									<AddToCart product={product} url={url} />
									<Map
										classes={classes}
										pointStart={product.location}
									/>
								</Hidden>
							</Grid>
						</Grid>
					</Container>
				</ThemeProvider>
			</ProductStyle>	
		}
	</React.Fragment>
)

export default ProductPage;