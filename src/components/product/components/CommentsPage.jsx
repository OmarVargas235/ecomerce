import React from 'react';

import { Avatar, Typography, Divider } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

import { CommentStyle } from '../style';

const CommentsPage = ({ classes, comment, nameFirstLetter, point, time }) => (
	<CommentStyle>
		<div className="my-4 d-flex">
			{
				comment.img
				? <img  className="comment-img" src={`http://localhost:5000/${comment.img}`} alt="img" />
				: <Avatar alt="Remy Sharp" className={classes.orange}>{nameFirstLetter}</Avatar>
			}

			<span className="ml-3 ml-sm-4">
				<Typography variant="h6" component="p">
			  		{comment.name}
				</Typography>

				<div className="d-flex align-items-center mb-2">
					<span className="mr-2">
						<StarIcon color={`${point > 0 ? 'primary' : 'disabled'}`} />
						<StarIcon color={`${point > 1 ? 'primary' : 'disabled'}`} />
						<StarIcon color={`${point > 2 ? 'primary' : 'disabled'}`} />
						<StarIcon color={`${point > 3 ? 'primary' : 'disabled'}`} />
						<StarIcon color={`${point > 4 ? 'primary' : 'disabled'}`} />
					</span>

					<Typography variant="body2" component="h1" color="textSecondary">
			  			{time}
					</Typography>
				</div>

				<Typography variant="body2" component="h1" className="comment">
			  		{comment.comment}.
				</Typography>

				<a href="/">Denunciar</a>
			</span>
		</div>

		<Divider />
	</CommentStyle>
)

export default CommentsPage;