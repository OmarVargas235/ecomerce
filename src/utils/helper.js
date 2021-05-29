import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

export const categorysScoreValue = [5, 4, 3, 2, 1];
export const categorysScore = [
	<React.Fragment>
		<StarIcon color="primary" />
		<StarIcon color="primary" />
		<StarIcon color="primary" />
		<StarIcon color="primary" />
		<StarIcon color="primary" />
	</React.Fragment>,
	<React.Fragment>
		<StarIcon color="primary" />
		<StarIcon color="primary" />
		<StarIcon color="primary" />
		<StarIcon color="primary" />
		<StarBorderIcon />
	</React.Fragment>,
	<React.Fragment>
		<StarIcon color="primary" />
		<StarIcon color="primary" />
		<StarIcon color="primary" />
		<StarBorderIcon />
		<StarBorderIcon />
	</React.Fragment>,
	<React.Fragment>
		<StarIcon color="primary" />
		<StarIcon color="primary" />
		<StarBorderIcon />
		<StarBorderIcon />
		<StarBorderIcon />
	</React.Fragment>,
	<React.Fragment>
		<StarIcon color="primary" />
		<StarBorderIcon />
		<StarBorderIcon />
		<StarBorderIcon />
		<StarBorderIcon />
	</React.Fragment>,
];

export const categorys = [
	'Juegos PC',
	'Juegos Moviles',
	'Accesorios',
	'Juegos consolas',
	'Componentes',
	'Decoracion'
];