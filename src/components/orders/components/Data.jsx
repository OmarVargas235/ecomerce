import React, { useState, useEffect } from 'react';

import { TableRow, TableCell } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';

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

const Data = ({ data }) => {

	const [brokenImg, setBrokenImg] = useState(false);

	useEffect(() => setBrokenImg(false), [data]);
	
	return (
		<StyledTableRow>
			<StyledTableCell component="th" scope="row" align="center">
				{data.number}
			</StyledTableCell>

			<StyledTableCell align="center">
				{
					data.image ? <React.Fragment>
						{
							brokenImg ? <BrokenImageIcon
								fontSize="large"
								color="inherit"
								style={{fill: '#2BC48A'}}
							/>
							: <img
								src={`${process.env.REACT_APP_BACKEND_URL}/${data.image}`}
								alt={data.name}
								className="image-table"
								onError={() => setBrokenImg(true)}
							/>
						}
					</React.Fragment>
					: <p>Sin imagen</p>
				}
			</StyledTableCell>

			<StyledTableCell align="center">{data.name}</StyledTableCell>
			<StyledTableCell align="center">{data.price}</StyledTableCell>
			<StyledTableCell align="center">{data.amount}</StyledTableCell>
		</StyledTableRow>
	)
}

export default Data;