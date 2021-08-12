import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ManageUsersCardPage from '../components/ManageUsersCardPage';
import { requestWithToken } from '../../../utils/fetch';
import { alert } from '../../../utils/alert';
import { logoutUser } from '../../../redux/actions/userAction';
import { styleMaterialUiTheme } from '../../../utils/styleMaterialUi';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const ManageUsersCard = ({ dataSelected }) => {

	const dispatch = useDispatch();
	const { auth:{token} } = useSelector(state => state.user);

	const theme = styleMaterialUiTheme();
	const matches = useMediaQuery('(max-width: 415px)');

	const [rol, setRol] = useState('');
	const [selectRol, setSelectRol] = useState('');
	
	// Obtener el rol que tiene el usuario actualmente
	useEffect(() => {
		
		const { role } = dataSelected;
		const clearRol = role.split('_')[0];

		setRol(clearRol);
		
	}, [dataSelected]);
	
	// Obtener el rol seleccionado
	const handleChange = select => setSelectRol(select);
	
	const changeRol = async () => {
		
		// Si el rol selecionado es igual al rol que tiene el usuario actualmente no lo cambia
		if (selectRol.length === 0 || selectRol === dataSelected.role) return;

		dataSelected.role = selectRol;
			
		const formData = new FormData();
		formData.append('user', JSON.stringify(dataSelected));

		const { ok, messages, isExpiredToken } = await requestWithToken('change-rol-user', token, formData, 'PUT');

		if (isExpiredToken) {
			
			dispatch( logoutUser() );
			alert('error', messages);

			return;
		}

		if (!ok) return alert('error', messages);
		
		const { message, role } = messages;
		
		setRol(role);
		alert('success', message);
	}
	
	return (
		<ManageUsersCardPage
			changeRol={changeRol}
			dataSelected={dataSelected}
			handleChange={handleChange}
			matches={matches}
			rol={rol}
			theme={theme}
		/>
	)
}

export default ManageUsersCard;