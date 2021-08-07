import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ProfilePage from './components/ProfilePage';
import { styleMaterialUiTheme } from '../../utils/styleMaterialUi';
import { useFetch } from '../../customHooks/useFetch';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider } from '@material-ui/styles';

const Profile = () => {

	// Redux
	const dataUser = useSelector(state => state.user.dataUser);

	const matches = useMediaQuery('(max-width: 600px)');
	const theme = styleMaterialUiTheme();
	
	const { uid } = dataUser;
	const respFetch = useFetch(`get-products/${uid}`);

	const [assessment, setAssessment] = useState(0);

	// Obtener el promedio de valoraciones dado a los productos de un usuario en concreto
	useEffect(() => {

		const { data, loading } = respFetch;

		if (loading) return;

		// Obtener la cantidad de productos que han sido calificados
		const amountQualification = data
									.map(product => product.ratingsProduct.length)
									.reduce((acc, el) => { return (acc += el, acc) }, 0);

		// Obetner la suma de todas las calificaciones dadas a todos los productos
		const totalQualification = data.map(product => {
			
			const sum = product.ratingsProduct.reduce((acc, el) => {
				
				return (acc += Number(el.qualification), acc);

			}, 0);

			return sum;

		}).reduce((acc, el) => { return (acc += el, acc) }, 0);

		const result = Math.trunc(totalQualification / amountQualification);
		totalQualification > 0 && setAssessment(result);
		
	}, [respFetch]);
	
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