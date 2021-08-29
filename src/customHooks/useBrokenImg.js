import { useState, useEffect } from 'react';

export const useBrokenImg = () => {

	const [brokenImg, setBrokenImg] = useState(false);

	useEffect(() => setBrokenImg(false), []);
	
	return [
		brokenImg,
		setBrokenImg,
	]
}