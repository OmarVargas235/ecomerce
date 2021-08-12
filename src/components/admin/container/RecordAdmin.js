import React from 'react';
import { useSelector } from 'react-redux';

import Orders from '../../orders/';

import { Alert } from '@material-ui/lab';
import Container from '@material-ui/core/Container';

const RecordAdmin = () => {

	const { dataUser:{role} } = useSelector(state => state.user);

	return (
		<React.Fragment>
			{
				role === 'USER_ROLE'
				? <Container maxWidth="sm" className="my-5">
					<Alert variant="filled" severity="error"><strong>No tienes permisos de administrador</strong></Alert>
				</Container>
				: <Orders
					url="get-orders"
				/>
			}
		</React.Fragment>
	)
}

export default RecordAdmin;