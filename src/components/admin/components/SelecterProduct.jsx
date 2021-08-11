import React from 'react';
import { useSelector } from 'react-redux';

import SelectionMenu from '../../../layaut/SelectionMenu';
import Spinner from '../../../layaut/Spinner';
import { useFetch } from '../../../customHooks/useFetch';

import CardAdmin from '../container/CardAdmin';
import ManageUsersCard from '../components/ManageUsersCard';

import Container from '@material-ui/core/Container';
import { Alert } from '@material-ui/lab';

const SelecterProduct = ({ addOrDeleteProduct, dataSelected, delateProduct, handleChange, isManage=false, isAdd, message, point, title }) => {
	
	const { dataUser:{role} } = useSelector(state => state.user);

	const { data, loading } = useFetch(isManage ? 'get-users': 'get-all-products');

	const urlArr = window.location.pathname.split('/');
	const query = urlArr[urlArr.length - 1];
	
	return (
		<React.Fragment>
			{
				(loading || !role) ? <Spinner />
				: <React.Fragment>
					{
						(	role === 'MODERATOR_ROLE' &&
							(query === 'agregar-producto-home' || query === 'administrar-usuarios')
						)
						? <Alert variant="filled" severity="error"><strong>No tienes permisos de administrador</strong></Alert>
						: <React.Fragment>
							<h2 className="mb-4">{title}</h2>

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
			}
		</React.Fragment>
	)
}

export default SelecterProduct;