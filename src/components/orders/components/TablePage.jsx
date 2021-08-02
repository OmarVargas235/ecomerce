import React, { useState } from 'react';

import Image from '../../../assets/img/carutula_1.jpg';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
});

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
  createData(2, 237, 9.0, 37, 4.3),
  createData(3, 262, 16.0, 24, 6.0),
  createData(4, 305, 3.7, 67, 4.3),
  createData(5, 356, 16.0, 49, 3.9),
  createData(6, 356, 16.0, 49, 3.9),
  createData(7, 356, 16.0, 49, 3.9),
  createData(9, 356, 16.0, 49, 3.9),
  createData(9, 356, 16.0, 49, 3.9),
  createData(10, 356, 16.0, 49, 3.9),
  createData(11, 356, 16.0, 49, 3.9),
  createData(12, 356, 16.0, 49, 3.9),
  createData(13, 356, 16.0, 49, 3.9),
  createData(14, 356, 16.0, 49, 3.9),
  createData(15, 356, 16.0, 49, 3.9),
];

const TablePage = () => {

	const classes = useStyles();

	const [page, setPage] = useState(0);
  	const [rowsPerPage, setRowsPerPage] = useState(5);

  	const handleChangePage = (event, newPage) => setPage(newPage);

	const handleChangeRowsPerPage = (event) => {
		
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	
	return (
		<React.Fragment>
			<h4 className="font-weight-normal">Domingo 10 de julio del 2021</h4>

			<TableContainer component={Paper} className="mb-4">
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
						{(rowsPerPage > 0
						? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: rows
						).map((row, index) => (
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
				
				<TablePagination
					rowsPerPageOptions={[5, 15, { label: 'All', value: -1 }]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
					labelRowsPerPage="Filas por página"
					labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
				/>
			</TableContainer>
		</React.Fragment>
	)
}

export default TablePage;