import React from 'react';

import Carousel from 'react-material-ui-carousel';
import { Dialog, Container  } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const ModalImgPage = ({ handleClose, items, indexCarrousel, openModal }) => {
	
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

	return (
		<Dialog
			fullScreen={fullScreen}
			open={openModal}
			onClose={handleClose}
			aria-labelledby="responsive-dialog-title"
		>
			<Container>
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
							<img src={img.img} alt={img.name} key={index} />
						))
					}
				</Carousel>
			</Container>
		</Dialog>
	)
}

export default ModalImgPage;