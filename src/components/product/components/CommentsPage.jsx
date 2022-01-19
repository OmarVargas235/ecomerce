import React from 'react';

import MenuThreePoints from '../../../layaut/MenuThreePoints';

import { Avatar, Typography, Divider } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';

import { CommentStyle } from '../style';

const ADMIN_ROLE = "ADMIN_ROLE";
const MODERATOR_ROLE = "MODERATOR_ROLE";

const CommentsPage = ({ classes, comment, dataUser, editOrdeleteComment, idUser, nameFirstLetter, point, time }) => (
	<CommentStyle>
		<div className="my-4 d-flex align-items-center">
			{
				comment.img
				? <img  className="comment-img align-self-start" src={comment.img} alt="img" />
				: <Avatar alt="Remy Sharp" className={classes.orange}>{nameFirstLetter}</Avatar>
			}
			
			<span className="ml-3 ml-sm-4 w-100">
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
			</span>
			
			{
				(comment.idUser === idUser || ADMIN_ROLE === dataUser.role || MODERATOR_ROLE === dataUser.role)
				? <MenuThreePoints
					handleChange={editOrdeleteComment}
					options={['Editar', 'Eliminar']}
				/> : null
			}
		</div>

		<Divider />
	</CommentStyle>
)

export default CommentsPage;