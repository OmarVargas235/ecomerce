import React from 'react';

import { OrdersStyle } from './style';
import Image from '../../assets/img/carutula_1.jpg';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

function createData(number, image, name, price, amount) {
	return { number, image, name, price, amount };
}

const rows = [
  createData(1, Image, 'nombre del producto', 40, 4),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const OrdersPage = ({ classes }) => (

	<OrdersStyle className="px-4 my-5">
		<h2 className="mb-5">Historial de ordenes</h2>
		
		<h4 className="font-weight-normal">Domingo 10 de julio del 2021</h4>

		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell align="center">#</StyledTableCell>
						<StyledTableCell align="center">Imagen</StyledTableCell>
						<StyledTableCell align="center">Producto</StyledTableCell>
						<StyledTableCell align="center">Precio</StyledTableCell>
						<StyledTableCell align="center">Cantidad</StyledTableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{rows.map((row, index) => (
						<StyledTableRow key={index}>
							<StyledTableCell component="th" scope="row" align="center">
								{row.number}
							</StyledTableCell>

							<StyledTableCell align="center">
								<img src={row.image} alt={row.name} />
							</StyledTableCell>

							<StyledTableCell align="center">{row.name}</StyledTableCell>
							<StyledTableCell align="center">{row.price}</StyledTableCell>
							<StyledTableCell align="center">{row.amount}</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	</OrdersStyle>
)

export default OrdersPage;