import React from 'react';

import ControlPanel from '../../layaut/ControlPanel';
import MineProductsPage from './MineProductsPage';

const MineProducts = ({ history }) => {
	
	return (
		<ControlPanel
			component={() => <MineProductsPage  history={history} />}
			title="Mis productos"
			text="Revisa todos los productos que has publicado aqui"
		/>
	)
}

export default MineProducts;