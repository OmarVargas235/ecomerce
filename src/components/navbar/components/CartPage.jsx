import React from 'react';

import imgPrueba from '../../../assets/img/mouse1.webp';
import { CartStyle } from '../style';

import { Drawer, Typography, Divider, IconButton } from '@material-ui/core';
import { List, ListItem, Button } from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CloseIcon from '@material-ui/icons/Close';

const CartPage = ({ cartRef, classes, handleDrawerOpen, handleDrawerClose, mouseMove, open, setOpen, setMouseMove, theme }) => (
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
				{[imgPrueba, imgPrueba].map((img, index) => (
				<ListItem
					key={index}
					selected={mouseMove === index}
					onMouseOver={() => setMouseMove(index)}
					onMouseOut={() => setMouseMove(-1)}
				>
					<img src={img} alt="prueba" />

					<div className="ml-4">
						<Typography variant="subtitle1" component="p">
							Mause
						</Typography>

						<div className="d-flex justify-content-between align-items-center">
							<div className="d-flex incrementAndDecrement mr-5">
								<span>-</span>
								<input type="text" defaultValue="4" readOnly />
								<span>+</span>
							</div>

							<Typography variant="subtitle1" component="p">
								<CloseIcon className="close-icon" /> $15.99
							</Typography>
						</div>
					</div>
				</ListItem>
				))}
			</List>

			<div className={`${189 + cartRef.current?.offsetHeight < window.innerHeight ? 'total_to_pay' : ''} mx-4`}>
				<Divider />
				
				<List>
					<div className="d-flex justify-content-between mb-4">
						<Typography variant="h6" component="h6">
							TOTAL A PAGAR
						</Typography>
						
						<Typography variant="h6" component="h6">
							$95.94
						</Typography>
					</div>
				
					<Button
						fullWidth={true}
						variant="contained"
						color="primary"
					>coprar</Button>
				</List>
			</div>
		</Drawer>
	</CartStyle>
);	

export default CartPage;