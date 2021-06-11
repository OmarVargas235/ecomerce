import React, { useState, useEffect } from 'react';
import MorePostsPage from '../components/MorePostsPage';

const MorePosts = ({ classes, idUser, products }) => {
	
	const [productsGroup, setProductsGroup] = useState([]);

	useEffect(() => {
		
		const arr = [];
		const n = Math.ceil(products.length / 4);
		let startCut = 0, endCut = 4;

		for (let i = 0; i < n; i++) {
					
			arr.push( products.slice(startCut, endCut) );

			startCut += 4;
			endCut += 4;
		}

		setProductsGroup(arr);
		
	}, [products]);

	return (
		<MorePostsPage
			classes={classes}
			idUser={idUser}
			products={productsGroup}
		/>
	)
}

export default MorePosts;