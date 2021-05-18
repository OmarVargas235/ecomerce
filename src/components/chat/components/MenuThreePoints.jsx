import React, { useState } from 'react';

import { Menu } from '@material-ui/core';
import { IconButton, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const MenuThreePoints = () => {

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	
	return (
		<React.Fragment>
			<IconButton
				aria-label="more"
				aria-controls="long-menu"
				aria-haspopup="true"
				onClick={(event) => setAnchorEl(event.currentTarget)}
			>
				<MoreVertIcon />
			</IconButton>

			<Menu
				id="long-menu"
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={() => setAnchorEl(null)}
				PaperProps={{
					style: {
						maxHeight: 48 * 4.5,
						width: '23ch',
						marginTop: '50px'
					},
				}}
			>
				{['Marcar como leido', 'Marcar como no leido', 'Bloquear'].map((option) => (
				<MenuItem key={option} selected={option === 'Pyxis'} onClick={() => setAnchorEl(null)}>
				{option}
				</MenuItem>
				))}
			</Menu>
		</React.Fragment>
	)
}

export default MenuThreePoints;