import React from 'react';

import Spinner from '../../../layaut/Spinner';

import { Grid, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { teal } from '@material-ui/core/colors';

const ProductPage = ({ delateProduct, history, product }) => (
	<Grid container className="mb-4">
		<Grid item xs={3} className="mb-3">
			{
				product.images.length === 0 ? <Spinner />
				: <img
					src={product.images[0].url}
					alt={product.name}
					className="img-fluid"
				/>
			}
		</Grid>

		<Grid item xs={6} container justify="center" direction="column">
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

			<Typography variant="body2" component="p" className="description text-left pl-2">
				{ product.description }
			</Typography>
		</Grid>

		<Grid item xs={3} container alignContent="center" justify="center" direction="column">
			<EditIcon
				style={{ color: teal[500] }}
				className="pointer mb-3"
				onClick={() => history.push(`/editar-producto/${product['_id']}`)}
			/>
			<DeleteIcon
				style={{ color: teal[500] }}
				className="pointer"
				onClick={() => delateProduct(product['_id'])}
			/>
		</Grid>	
	</Grid>
)

export default ProductPage;