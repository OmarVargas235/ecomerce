import React from 'react';

import { OrdersStyle } from '../style';
import { isString } from '../helper';
import Table from '../container/Table';
import Spinner from '../../../layaut/Spinner';

import { Alert } from '@material-ui/lab';

const OrdersPage = ({ tables }) => (

	<OrdersStyle className="px-4 my-5">
		<h2 className="mb-5">Historial de ordenes</h2>
		
		{
			tables.length === 0 ? <Spinner />
			: <React.Fragment>
				{	isString(tables) 
					? <Alert variant="filled" severity="info"><strong>{tables}</strong></Alert>
					: tables.map((data, i) => (
						<Table key={i} data={data} />
					))
				}
			</React.Fragment>
		}

	</OrdersStyle>
)

export default OrdersPage;