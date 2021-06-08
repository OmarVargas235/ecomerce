import React from 'react';

import SelectionMenu from '../../layaut/SelectionMenu';
import Spinner from '../../layaut/Spinner';
import { TealButton } from '../../utils/styleMaterialUi';

import { Divider } from '@material-ui/core';

const ProductLocationPage = ({prev, products, state, selected, selectedProduct }) => (
	<div className="py-4 px-5 text-center">
		<div className="px-4">
			{
				state.idProduct ? null
				: <SelectionMenu
					categorys={products.map(product => product.name)}
					setChange={selectedProduct}
					title='Escoje un producto'
					value={products.map((p, i) => i)}
				/>
			}

			<div className="mb-4"></div>
			
			{
				!state.idProduct ? null
				: <React.Fragment> {
					Object.keys(state.countries).length === 0 ? <Spinner />
					: <React.Fragment>
						<h5>{state.countries.title}</h5>

						<SelectionMenu
							categorys={state.countries.categorys}
							setChange={selected}
							title={state.countries.title}
							value={state.countries.value}
						/>

						<Divider className="my-4" />

						<TealButton
							variant="contained"
							type="submit"
							onClick={prev}
						>prev</TealButton>			
					</React.Fragment>
				} </React.Fragment>
			}
		</div>
	</div>
)

export default ProductLocationPage;