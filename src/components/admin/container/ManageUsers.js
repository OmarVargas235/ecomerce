import React, { useState } from 'react';

import SelecterProduct from '../components/SelecterProduct';
import { useFetch } from '../../../customHooks/useFetch';

import Container from '@material-ui/core/Container';

const ManageUsers = () => {
	
	const { data } = useFetch('get-users');

	const [dataSelected, setDataSelected] = useState({});

	const handleChange = select => {
		
		if (select === '') return;

		const findUser = data.find(user => user['_id'] === select);
		setDataSelected(findUser);
	}

	return (
		<Container maxWidth="sm" className="my-5">
			<SelecterProduct
				handleChange={handleChange}
				isManage={true}
				// message="editar producto"
				dataSelected={dataSelected}
				title="Administrar usuarios"
			/>
		</Container>
	)
}

export default ManageUsers;