import React from 'react';

import { ReactComponent as BuyHeart } from '../../../assets/icons/buy-heart.svg';
import { ReactComponent as Shipping } from '../../../assets/icons/shipping.svg';
import { ReactComponent as FreeSell } from '../../../assets/icons/free-sell.svg';

import Grid from '@material-ui/core/Grid';

const Footer = ({ classes }) => (
    <Grid container justify='center' alignItems='center' className="mt-5 p-4 footer">
		<Grid item xs={3} className="mr-5 text-center border-right">
			<BuyHeart />

			<h5 className="font-weight-normal mt-4">Compra sin moverte</h5>

			<p className="text-lightgray">Encuentra lo que necesitas, y coordina el pago y la entrega con el vendedor. Es fácil y rápido. ¡Todos podemos hacerlo!</p>
		</Grid>

		<Grid item xs={3} className="mr-5 text-center border-right">
			<Shipping />

			<h5 className="font-weight-normal mt-4">Compra sin moverte</h5>

			<p className="text-lightgray">Encuentra lo que necesitas, y coordina el pago y la entrega con el vendedor. Es fácil y rápido. ¡Todos podemos hacerlo!</p>
		</Grid>

		<Grid item xs={3} className="mr-5 text-center">
			<FreeSell />

			<h5 className="font-weight-normal mt-4">Recibe tu producto</h5>

			<p className="text-lightgray">Acuerda la entrega de tu compra con el vendedor. Puedes recibirlo en tu casa, en la oficina o retirarlo. ¡Tú decides qué prefieres!</p>
		</Grid>
    </Grid>
)

export default Footer;