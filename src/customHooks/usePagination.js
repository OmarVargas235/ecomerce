import { useState } from 'react';

export const usePagination = (init=0, endProp=5) => {
	
	const [initial, setInitial] = useState(init);
	const [end, setEnd] = useState(endProp);

	// Avanzar o retroceder a la siguiente seccion de comentarios
	const handleChangePage  = (e, newPage) => {
		
		const endPage = newPage * endProp;
		const initialPage = endPage - endProp;

		setInitial( initialPage );
		setEnd(endPage);
	}

	return [initial, end, handleChangePage];
}