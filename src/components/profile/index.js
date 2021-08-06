import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ProfilePage from './components/ProfilePage';
import { requestWithoutToken } from '../../utils/fetch';
import { alert } from '../../utils/alert';
import { styleMaterialUiTheme } from '../../utils/styleMaterialUi';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider } from '@material-ui/styles';

const Profile = () => {

	// Redux
	const dataUser = useSelector(state => state.user.dataUser);

	const matches = useMediaQuery('(max-width: 600px)');
	const theme = styleMaterialUiTheme();

	const [assessment, setAssessment] = useState(0);
	const [isMounted, setIsMounted] = useState(false); 

	// Obtener el promedio de valoraciones dado a los productos de un usuario en concreto
	useEffect(() => {

		if (!dataUser.uid) return;
		
		async function callAPI() {
			
			const { uid } = dataUser;

			const resp = await requestWithoutToken(`get-products/${uid}`);
			const { ok, messages } = await resp.json();

			if (!ok) return alert('error', messages);

			// Obtener la cantidad de productos que han sido calificados
			const amountQualification = messages
										.map(product => product.ratingsProduct.length)
										.reduce((acc, el) => { return (acc += el, acc) }, 0);

			// Obetner la suma de todas las calificaciones dadas a todos los productos
			const totalQualification = messages.map(product => {
				
				const sum = product.ratingsProduct.reduce((acc, el) => {
					
					return (acc += Number(el.qualification), acc);

				}, 0);

				return sum;

			}).reduce((acc, el) => { return (acc += el, acc) }, 0);

			const result = Math.trunc(totalQualification / amountQualification);
			totalQualification > 0 && setAssessment(result);
		}

		isMounted && callAPI();

		return () => setIsMounted(false);
		
	}, [dataUser, isMounted]);
	
	return (
		<ThemeProvider theme={theme}>
			<ProfilePage
				assessment={assessment}
				dataUser={dataUser}
				matches={matches}
			/>
		</ThemeProvider>
	)
}

export default Profile;