import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OrdersPage from './components/OrdersPage';
import { classifyOrders, isString } from './helper';
import { requestWithToken } from '../../utils/fetch';
import { alert } from '../../utils/alert';
import { logoutUser } from '../../redux/actions/userAction';

const Orders = () => {

	const { auth:{ token }, dataUser } = useSelector(state => state.user);
	const dispatch = useDispatch();

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
		}

		callAPI();

		return () => setTablesData([]);
		
	}, [dataUser, token, dispatch]);
	
	return (
		<OrdersPage
			tablesData={tablesData}
		/>
	)
}

export default Orders;