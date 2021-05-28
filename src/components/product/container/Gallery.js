import React, { useState, useEffect } from 'react';
import GalleryPage from '../components/GalleryPage'; 

const Gallery = ({ product }) => {

	const { images, name } = product;
	
	const [openModal, setOpenModal] = useState(false);
	const [changeImg, setChangeImg] = useState({});

	useEffect(() => setChangeImg({img: images[0], index: 0}), [images]);

	const handleClickOpen = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);

	return (
		<GalleryPage
			changeImg={changeImg}
			handleClose={handleClose}
			handleClickOpen={handleClickOpen}
			images={product.images}
			name={name}
			openModal={openModal}
			setChangeImg={setChangeImg}
		/>
	)
}

export default Gallery;