import React from 'react';
import moment from 'moment';
import 'moment/locale/es';

import CommentsPage from '../components/CommentsPage';

import { makeStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

const Comments = ({ comment, qualifications }) => {

	const classes = useStyles();

	moment.locale('es');

	const date = new Date(comment.date);
	const nameFirstLetter = comment.name.charAt(0).toUpperCase();
	const time = moment(date, "YYYYMMDD").fromNow();
	const point = qualifications.find(el => el.idUser === comment.idUser);
	
	return (
		<CommentsPage
			classes={classes}
			comment={comment}
			nameFirstLetter={nameFirstLetter}
			point={point?.qualification}
			time={time}
		/>	
	)
}

export default Comments;