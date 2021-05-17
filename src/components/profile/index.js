import React from 'react';

import ProfilePage from './ProfilePage';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const Profile = () => {

	const matches = useMediaQuery('(max-width: 600px)');
	
	return (
		<ProfilePage
			matches={matches}
		/>
	)
}

export default Profile;