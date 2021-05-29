import React from 'react';

import { CartStyle } from '../style';
import { ThemeProvider } from '@material-ui/styles';

import { Drawer, Typography, Divider, IconButton } from '@material-ui/core';
import { List, ListItem, Button } from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CloseIcon from '@material-ui/icons/Close';

const CartPage = ({ buyProduct, cartRef, classes, deleteProduct, handleDrawerOpen, handleDrawerClose, mouseMove, open, products, plusOrLess, setMouseMove, theme, themeColour, totalToPay }) => (
	<CartStyle className={classes.root}>
		
		<ShoppingCartIcon className="pointer icon" onClick={handleDrawerOpen} />

		<Drawer
			variant="persistent"
			anchor="right"
			open={open}
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<div className="p-2 d-flex justify-content-between align-items-center">
				<IconButton onClick={handleDrawerClose}>
				{theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>

				<Typography variant="subtitle1" component="p" className="mr-3">
					Tu carrito
				</Typography>
			</div>

			<Divider />
			
			<List ref={cartRef}>
				{products.map((product, index) => (
				<ListItem
					key={index}
					selected={mouseMove === index}
					onMouseOver={() => setMouseMove(index)}
					onMouseOut={() => setMouseMove(-1)}
				>
					<img src={`http://localhost:5000/${product.img}`} alt="prueba" />

					<div className="ml-4">
						<Typography variant="subtitle1" component="p">
							{product.name}
						</Typography>

						<div className="d-flex justify-content-between align-items-center">
							<div className="d-flex incrementAndDecrement mr-5">
								<span
									onClick={() => plusOrLess(product, 'less')}
								>-</span>
								<input type="text" value={product.cont} readOnly />
								<span
									onClick={() => plusOrLess(product)}
								>+</span>
							</div>

							<Typography variant="subtitle1" component="div">
								<CloseIcon
									className="close-icon"
									onClick={() => deleteProduct(product)}
								/>
								<div className="price">${parseFloat(product.price) * product.cont}</div>
							</Typography>
						</div>
					</div>
				</ListItem>
				))}
			</List>

			<div className={`${240 + cartRef.current?.offsetHeight < window.innerHeight ? 'total_to_pay' : ''} mx-4`}>
				<Divider />
				
				<List>
					<div className="d-flex justify-content-between mb-4">
						<Typography variant="h6" component="h6">
							TOTAL A PAGAR
						</Typography>
						
						<Typography variant="h6" component="h6" className="total-pay">
							${totalToPay.toFixed(2)}
						</Typography>
					</div>
					
					<ThemeProvider theme={themeColour}>
						<Button
							fullWidth={true}
							variant="contained"
							color="primary"
							onClick={buyProduct}
						>comprar</Button>
					</ThemeProvider>
				</List>
			</div>
		</Drawer>
	</CartStyle>
);	

export default CartPage;