import React, { useState } from 'react';
import GalleryPage from '../components/GalleryPage';

const Gallery = ({ img, items, name }) => {
	
	const [openModal, setOpenModal] = useState(false);
	const [changeImg, setChangeImg] = useState({ img: items[0].img, id: items[0].id });

	const handleClickOpen = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);

	const indexCarrousel = items.findIndex(item => item.id === changeImg.id);

	return (
		<GalleryPage
			changeImg={changeImg}
			handleClose={handleClose}
			handleClickOpen={handleClickOpen}
			img={img}
			items={items}
			indexCarrousel={indexCarrousel}
			name={name}
			openModal={openModal}
			setChangeImg={setChangeImg}
		/>
	)
}

export default Gallery;