import React from 'react';
import moment from 'moment';

import { OrdersStyle } from '../style';
import { isString } from '../helper';
import Table from '../container/Table';
import Spinner from '../../../layaut/Spinner';
import SelectionMenu from '../../../layaut/SelectionMenu';

import { Alert } from '@material-ui/lab';
import Container from '@material-ui/core/Container';

const OrdersPage = ({ matches, setChange, tableCategory, tablesData }) => (

	<OrdersStyle className="px-4 my-5">
		<Container maxWidth={`${matches ? 'lg' : 'md'}`}>
			<h2 className="mb-3">Historial de ordenes</h2>
		</Container>
		
		{
			tablesData.length === 0 ? <Spinner />
			: <Container maxWidth={`${matches ? 'lg' : 'md'}`}>
				<SelectionMenu
					categorys={tableCategory.map(data => moment(data[0].date, "YYYYMMDD").format('LL'))}
					value={tableCategory.map(data => data[0].date)}
					title="Filtrar historial por fecha"
					setChange={setChange}
				/>

				<div className="mb-5"></div>
								
				{	isString(tablesData) 
					? <Alert variant="filled" severity="info"><strong>{tablesData}</strong></Alert>
					: tablesData.map((data, i) => (
						<Table key={i} data={data} />
					))
				}
			</Container>
		}
	</OrdersStyle>
)

export default OrdersPage;