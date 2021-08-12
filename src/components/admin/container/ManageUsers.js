import React, { useState } from 'react';

import SelecterProduct from '../components/SelecterProduct';
import { useFetch } from '../../../customHooks/useFetch';

const ManageUsers = () => {
	
	const { data } = useFetch('get-users');

	const [dataSelected, setDataSelected] = useState({});

	const handleChange = select => {
		
		if (select === '') return;

		const findUser = data.find(user => user['_id'] === select);
		setDataSelected(findUser);
	}

	return (		
		<SelecterProduct
			dataSelected={dataSelected}
			handleChange={handleChange}
			isManage={true}
			title="Administrar usuarios"
		/>
	)
}

export default ManageUsers;