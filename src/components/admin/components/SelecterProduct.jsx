import React from 'react';

import SelectionMenu from '../../../layaut/SelectionMenu';
import Spinner from '../../../layaut/Spinner';
import { useFetch } from '../../../customHooks/useFetch';

import CardAdmin from '../container/CardAdmin';
import ManageUsersCard from '../components/ManageUsersCard';

import Container from '@material-ui/core/Container';

const SelecterProduct = ({ addOrDeleteProduct, dataSelected, delateProduct, handleChange, isManage=false, isAdd, message, point, title }) => {

	const { data, loading } = useFetch(isManage ? 'get-users': 'get-all-products');

	return (
		<React.Fragment>
			<h2 className="mb-4">{title}</h2>

			{
				loading ? <Spinner />
				: <React.Fragment>
					<SelectionMenu
						categorys={data.map(product => product.name)}
						value={data.map(product => product['_id'])}
						title={`Seleccionar un ${isManage ? 'usuario' : 'producto'}`}
						setChange={handleChange}
					/>
					
					{
						!dataSelected.name ? null
						: <Container maxWidth="sm">
							{
								isManage ? <ManageUsersCard
									dataSelected={dataSelected}
								/>
								: <CardAdmin
									addOrDeleteProduct={addOrDeleteProduct}
									dataSelected={dataSelected}
									delateProduct={delateProduct}
									isAdd={isAdd}
									message={message}
									point={point}
								/>
							}
						</Container>
					}
				</React.Fragment>
			}
		</React.Fragment>
	)
}

export default SelecterProduct;