import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';

import OrdersPage from './components/OrdersPage';
import { classifyOrders, isString } from './helper';
import { requestWithToken } from '../../utils/fetch';
import { alert } from '../../utils/alert';
import { logoutUser } from '../../redux/actions/userAction';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const Orders = () => {

	const { auth:{ token }, dataUser } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const matches = useMediaQuery('(max-width:800px)');

	moment.locale('es');

	const [tableCategory, setTableCategory] = useState([]);
	const [tablesData, setTablesData] = useState([]);

	// Obtener la data del backend y ordenarla por fechas
	useEffect(() => {
		
		if (Object.keys(dataUser).length === 0) return;
		
		async function callAPI() {
			
			const { uid } = dataUser;
			const resp = await requestWithToken(`get-orders/${uid}`, token);
			const { ok, messages, isExpiredToken } = await resp.json();

			// Si el token ya a expirado se deslogea
			if (isExpiredToken) {
				
				dispatch( logoutUser() );
				alert('error', messages);
				
				return;
			}

			if (!ok) return alert('error', messages);

			const orders = isString(messages) ? messages : classifyOrders(messages);

			setTablesData(orders);
			setTableCategory(isString(messages) ? [] : orders);
		}

		callAPI();

		return () => setTablesData([]);
		
	}, [dataUser, token, dispatch]);

	const setChange = select => {
		
		const filterTable = tableCategory.find(data => data[0].date === select);
		setTablesData(select.length === 0 ? tableCategory : [filterTable]);
	}
	
	return (
		<OrdersPage
			matches={matches}
			setChange={setChange}
			tableCategory={tableCategory}
			tablesData={tablesData}
		/>
	)
}

export default Orders;