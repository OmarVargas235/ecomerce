import { useState } from 'react';

export const useUploadForm = (initialState='') => {

	const [previewImages, setPreviewImages] = useState(initialState);
	const [image, setImage] = useState(null);
	const [images, setImages] = useState([]);
	
	const handleChangeImg = (e, empty=false) => {
		
		if (empty) return setPreviewImages(e);

		// Creamos el objeto de la clase FileReader
		const reader = new FileReader();
		const file = e.target.files[0];

		// Leemos el archivo subido y se lo pasamos a nuestro fileReader
		reader.readAsDataURL(file);
		setImage(file);
		setImages(state => [...state, { name: file.name, file} ]);
		
		// Le decimos que cuando este listo ejecute el código interno
		reader.onload = () => initialState === ''
		? setPreviewImages(reader.result)
		: setPreviewImages(state => [...state, reader.result]);
	}

	return [previewImages, handleChangeImg, image, images];
}