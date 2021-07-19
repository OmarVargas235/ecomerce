import { useState, useCallback } from 'react';

export const useUploadForm = (initialState='') => {

	const [previewImages, setPreviewImages] = useState(initialState);
	const [image, setImage] = useState(null);
	const [images, setImages] = useState([]);

	const readAndPreview = useCallback((file, isOneImg=false) => {

		// Creamos el objeto de la clase FileReader
		const reader = new FileReader();

		// Leemos el archivo subido y se lo pasamos a nuestro fileReader
		reader.readAsDataURL(file);

		// Le decimos que cuando este listo ejecute el código interno
		reader.onload = () => isOneImg
		? setPreviewImages(reader.result)
		: setPreviewImages(state => [...state, reader.result]);

	}, []);
	
	const handleChangeImg = (e, empty=false, imagesFiles=[]) => {
		
		if (empty) {

			setImages(imagesFiles);
			return setPreviewImages(e);
		}

		if (initialState === '') {

			const file = e.target.files[0];

			setImage(file);
			readAndPreview(file, true);
		
		} else {

			const files = Array.from(e.target.files);

			setImages(state => [...state, ...files]);
			files.forEach(file => readAndPreview(file));
		}
	}

	return [previewImages, handleChangeImg, image, images];
}