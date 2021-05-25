import React from 'react';
import { useSelector } from 'react-redux';

import ProfilePage from './ProfilePage';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const Profile = () => {
	
	// Redux
	const dataUser = useSelector(state => state.user.dataUser);

	const matches = useMediaQuery('(max-width: 600px)');
	
	return (
		<ProfilePage
			dataUser={dataUser}
			matches={matches}
		/>
	)
}

export default Profile;