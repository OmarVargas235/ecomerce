import React, { useState, useEffect } from 'react';

import { Grid, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { teal } from '@material-ui/core/colors';
import { TealButton } from '../../../utils/styleMaterialUi';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';

const ProductPage = ({ delateProduct, history, product }) => {

	const [brokenImg, setBrokenImg] = useState(false);

	useEffect(() => setBrokenImg(false), []);

	return (
		<Grid container className="mb-4 py-4 px-5 text-center">
			<Grid item xs={3} className="mb-3">
					{
						brokenImg ? <BrokenImageIcon
							fontSize="large"
							color="inherit"
							style={{fill: '#2BC48A'}}
						/>
						: <img
							src={`http://localhost:5000/${product.img}`}
							alt={product.name}
							className="img-fluid"
							onError={() => setBrokenImg(true)}
						/>
					}
			</Grid>
			
			<Grid item xs={5} container justify="center" direction="column">
				<Typography
					variant="body2"
					component="p"
					className="mb-1 font-weight-bold"
					paragraph
				>
					{ product.name }
				</Typography>
			
				<Typography variant="body2" component="p" className="mb-1" paragraph>
					${ product.price }
				</Typography>
			</Grid>

			<Grid item xs={4} container alignContent="center" justify="center">
				<DeleteIcon
					style={{ color: teal[500] }}
					className="pointer mt-2"
					onClick={() => delateProduct(product.id)}
				/>

				<TealButton
					variant="contained"
					onClick={() => history.push(`/producto/${product.id}`)}
				>
					ver mas
				</TealButton>
			</Grid>
		</Grid>
	)
}

export default ProductPage;