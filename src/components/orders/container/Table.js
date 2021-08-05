import React, { useState, useEffect } from 'react';
import moment from 'moment';

import TablePage from '../components/TablePage';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
});

const Table = ({ data }) => {

	const classes = useStyles();

	const [page, setPage] = useState(0);
  	const [rowsPerPage, setRowsPerPage] = useState(5);
  	const [day, setDay] = useState('');
  	const [date, setDate] = useState('');

  	const handleChangePage = (event, newPage) => setPage(newPage);

	const handleChangeRowsPerPage = (event) => {
		
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	
	useEffect(() => {
		
		setPage(0);
  		setRowsPerPage(5);

		setDay( moment(data[0].date, "YYYYMMDD").format('dddd') );
		setDate( moment(data[0].date, "YYYYMMDD").format('LL') );
		
		data.forEach((order, index) => order.number = index+1);
		
	}, [data]);
	
	return (
		<TablePage
			classes={classes}
			day={day}
			date={date}
			data={data}
			handleChangePage={handleChangePage}
			handleChangeRowsPerPage={handleChangeRowsPerPage}
			page={page}
			rowsPerPage={rowsPerPage}
		/>
	)
}

export default Table;