import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { teal } from '@material-ui/core/colors';

const MineProductsPage = ({ history, loading, products=[] }) => (
	<div className="py-4 px-5 text-center">
		{console.log(loading)}
		{
			products.map((product, index) => (
				<Grid container key={index} className="mb-3">
					<Grid item xs={3} className="mb-3">
						<img src={`http://localhost:5000/${product.img}`} alt={product.name} className="img-fluid" />
					</Grid>

					<Grid item xs={6} container justify="center" direction="column">
						<Typography
							variant="body2"
							component="p"
							paragraph
						>
							{ product.name }
						</Typography>
					
						<Typography variant="body2" component="p" paragraph>
							${ product.price }
						</Typography>

						<Typography variant="body2" component="p">
							{ product.description }
						</Typography>
					</Grid>

					<Grid item xs={3} container alignContent="center" justify="center" direction="column">
						<EditIcon
							style={{ color: teal[500] }}
							className="pointer mb-3"
							onClick={() => history.push('/editar-producto')}
						/>
						<DeleteIcon style={{ color: teal[500] }} className="pointer" />
					</Grid>
				</Grid>
			))
		}
	</div>
)

export default MineProductsPage;