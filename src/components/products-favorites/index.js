import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import FavoritesPage from './components/FavoritesPage';
import ControlPanel from '../../layaut/ControlPanel';
import {
	getFavoriteProductActions,
	deleteFavoriteProductActions
} from '../../redux/actions/userAction';

let cont = 0;

const Favorites = () => {
	
	const dispatch = useDispatch();
	const { auth, dataUser, productsFavorites } = useSelector(state => state.user);

	const history = useHistory();
	
	// Simplifica los objetos de los productos que vienen del backend
	const products = useMemo(() => {

		const productsArr = productsFavorites.map(productEl => {
			
			const { idProduct, product } = productEl;

			const obj = {
				id: idProduct,
				img: product.images[0],
				name: product.name,
				price: product.price,
			}

			return obj;
		});

		return productsArr;

	}, [productsFavorites]);
	
	// Dispara el dispatch para obtener los productos agregados a favoritos
	useEffect(() => {
		
		if ( Object.keys(dataUser).length === 0 ) return;

		// Con el "cont = 2" evita que se genere un bucle infinito
		if (cont === 2) return;
		
		dispatch( getFavoriteProductActions(dataUser.uid, auth.token) );
		cont++;

	}, [dataUser, dispatch, auth]);

	const delateProduct = id => {
		
		const formData = new FormData();
		formData.append('idProduct', id);

		dispatch( deleteFavoriteProductActions(formData, dataUser.uid, auth.token) )
	}
	
	return (
		<ControlPanel
			component={() => <FavoritesPage
				delateProduct={delateProduct}
				history={history}
				productsFavorites={products}
			/>}
			title="Favoritos"
			text="Revisa todos los productos que has agregado a favoritos aqui"
		/>
	)
}

export default Favorites;