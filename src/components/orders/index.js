import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';

import OrdersPage from './components/OrdersPage';
import { classifyOrders, isString } from './helper';
import { useFetch } from '../../customHooks/useFetch';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const Orders = () => {

	const { dataUser } = useSelector(state => state.user);

	const matches = useMediaQuery('(max-width:800px)');

	moment.locale('es');
	
	const { uid } = dataUser;
	const respFetch = useFetch(`get-orders/${uid}`, true);

	const [tableCategory, setTableCategory] = useState([]);
	const [tablesData, setTablesData] = useState([]);

	// Obtener la data del backend y ordenarla por fechas
	useEffect(() => {
		
		const { data, loading } = respFetch;

		if (loading) return;

		const orders = isString(data) ? data : classifyOrders(data);
		
		setTablesData(orders);
		setTableCategory(isString(data) ? [] : orders);
		
	}, [respFetch]);

	const setChange = select => {
		
		const filterTable = tableCategory.find(data => data[0].date === select);
		setTablesData(select.length === 0 ? tableCategory : [filterTable]);
	}
	
	return (
		<OrdersPage
			loading={respFetch.loading}
			matches={matches}
			setChange={setChange}
			tableCategory={tableCategory}
			tablesData={tablesData}
		/>
	)
}

export default Orders;