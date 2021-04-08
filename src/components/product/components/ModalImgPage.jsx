import React from 'react';

import { ModalStyle } from '../style';

import Carousel from 'react-material-ui-carousel';
import { Dialog, Container  } from '@material-ui/core';

const ModalImgPage = ({ handleClose, items, indexCarrousel, openModal }) => (
	<Dialog
		open={openModal}
		onClose={handleClose}
		aria-labelledby="responsive-dialog-title"
		fullWidth={true}
	>
		<Container>
			<ModalStyle className="text-center">
				<Carousel 
					animation='slide'
					className="my-4"
					autoPlay={false}
					navButtonsAlwaysVisible
					indicators={false}
					index={indexCarrousel}
				>
					{
						items.map((img, index) => (
							<img src={img.img} alt={img.name} key={index} className="img-modal" />
						))
					}
				</Carousel>
			</ModalStyle>
		</Container>
	</Dialog>
);

export default ModalImgPage;