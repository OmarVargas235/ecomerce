import React from 'react';

import SelectionMenu from '../../../layaut/SelectionMenu';
import Spinner from '../../../layaut/Spinner';
import { useFetch } from '../../../customHooks/useFetch';

import CardAdmin from '../container/CardAdmin';
import ManageUsersCard from '../components/ManageUsersCard';

import { Container } from '@material-ui/core';

const SelecterProduct = ({ addOrDeleteProduct, dataSelected, delateProduct, handleChange, isManage=false, isAdd, message, point, title }) => {

	const { data, loading } = useFetch(isManage ? 'get-users': 'get-all-products');

	return (
		<Container maxWidth="sm" className="my-5">
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
						: <React.Fragment>
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
						</React.Fragment>
					}
				</React.Fragment>
			}
		</Container>
	)
}

export default SelecterProduct;