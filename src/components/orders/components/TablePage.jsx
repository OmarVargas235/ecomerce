import React from 'react';

import Data from './Data';

import { Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Paper, TableCell, TablePagination } from '@material-ui/core';
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

const TablePage = ({ classes, day, date, data, handleChangePage, handleChangeRowsPerPage, page, rowsPerPage }) => (
	<React.Fragment>
		<h4 className="font-weight-normal mb-3">
			<span className="text-capitalize">{day}</span>
			{" " + date}
		</h4>

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
					? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
					: data
					).map((row, index) => (
						<Data
							key={index}
							data={row}
						/>
					))}
				</TableBody>
			</Table>
			
			<TablePagination
				rowsPerPageOptions={[5, 15, { label: 'All', value: -1 }]}
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={ (page * 5) > data.length ? 0 : page }
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
				labelRowsPerPage="Filas por página"
				labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
			/>
		</TableContainer>
	</React.Fragment>
)

export default TablePage;