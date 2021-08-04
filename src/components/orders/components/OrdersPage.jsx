import React from 'react';

import { OrdersStyle } from '../style';
import { isString } from '../helper';
import Table from '../container/Table';
import Spinner from '../../../layaut/Spinner';

import { Alert } from '@material-ui/lab';

const OrdersPage = ({ tablesData }) => (

	<OrdersStyle className="px-4 my-5">
		<h2 className="mb-5">Historial de ordenes</h2>
		
		{
			tablesData.length === 0 ? <Spinner />
			: <React.Fragment>
				{	isString(tablesData) 
					? <Alert variant="filled" severity="info"><strong>{tablesData}</strong></Alert>
					: tablesData.map((data, i) => (
						<Table key={i} data={data} />
					))
				}
			</React.Fragment>
		}

	</OrdersStyle>
)

export default OrdersPage;