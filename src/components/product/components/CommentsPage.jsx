import React from 'react';

import { Avatar, Typography, Divider } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

const CommentsPage = () => {
	
	const classes = useStyles();

	return (
		<React.Fragment>
			<div className="my-4 d-flex">
				<Avatar alt="Remy Sharp" className={classes.orange}>B</Avatar>

				<span className="ml-3 ml-sm-4">
					<Typography variant="h6" component="p">
				  		Luis Gil
					</Typography>

					<div className="d-flex align-items-center mb-2">
						<span className="mr-2">
							<StarIcon color="primary" />
							<StarIcon color="primary" />
							<StarIcon color="primary" />
							<StarIcon color="primary" />
							<StarIcon color="primary" />
						</span>

						<Typography variant="body2" component="h1" color="textSecondary">
				  			hace 2 meses
						</Typography>
					</div>

					<Typography variant="body2" component="h1">
				  		El cursos es demasiado bueno, superó mis expectativas, y eso que ya he tomado más cursos de Fernando; sin duda es una buena opción para aprender React.
					</Typography>

					<a href="/">Denunciar</a>
				</span>
			</div>

			<Divider />
		</React.Fragment>
	)
}

export default CommentsPage;