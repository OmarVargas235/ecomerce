import React, { useState, useEffect } from 'react';

import ImagesTextareaPage from '../components/ImagesTextareaPage';

const ImagesTextarea = ({ handleChangeImg, files, previewImages }) => {

	const [images, setImages] = useState([]);

	useEffect(() => setImages(previewImages), [previewImages]);

	const deleteImagePreview = (index = -1) => {
		
		const copyImages = [...images];
		const imagesFiles = [...files];

		if (index === -1) return;
		
		copyImages.splice(index, 1);
		imagesFiles.splice(index, 1);
		setImages(copyImages);

		handleChangeImg(copyImages, true, imagesFiles);
	}
	
	return (
		<ImagesTextareaPage
			deleteImagePreview={deleteImagePreview}
			handleChangeImg={handleChangeImg}
			previewImages={images}
		/>
	)
}

export default ImagesTextarea;