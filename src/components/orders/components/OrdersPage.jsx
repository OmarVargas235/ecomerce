import React from 'react';

import { OrdersStyle } from '../style';
import TablePage from './TablePage';

const OrdersPage = () => (

	<OrdersStyle className="px-4 my-5">
		<h2 className="mb-5">Historial de ordenes</h2>
		
		{
			[1,2].map((el, i) => (
				<TablePage key={i} />
			))
		}

	</OrdersStyle>
)

export default OrdersPage;