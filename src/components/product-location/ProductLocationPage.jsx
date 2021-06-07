import React from 'react';

import SelectionMenu from '../../layaut/SelectionMenu';
import { TealButton } from '../../utils/styleMaterialUi';
import Spinner from '../../layaut/Spinner';
import { MapStyle } from './style';

import { Divider } from '@material-ui/core';

const ProductLocationPage = ({ countries, latLng, mapRef, prev, selected }) => (
	<div className="py-4 px-5 text-center">
		<div className="px-4">
			{
				Object.keys(countries).length === 0 ? <Spinner />
				: <React.Fragment>
					<h5>{countries.title}</h5>

					<SelectionMenu
						categorys={countries.categorys}
						setChange={selected}
						title={countries.title}
						value={countries.value}
					/>

					<Divider className="my-4" />

					<TealButton
						variant="contained"
						type="submit"
						disabled={countries.title === 'Escoje un pais'}
						onClick={prev}
					>prev</TealButton>					
				</React.Fragment>
			}
			
		</div>

		{
			Object.keys(latLng).length === 0
			? <div ref={mapRef} className="w-100"></div>
			: <MapStyle className="mt-5">
				<div ref={mapRef} className="w-100">mapa</div>
			</MapStyle>
		}
		
	</div>
)

export default ProductLocationPage;