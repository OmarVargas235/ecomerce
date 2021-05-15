import React, { useState } from 'react';

import { styleMaterialUiTheme } from '../../../utils/styleMaterialUi';

import { Typography, Popover, Badge } from '@material-ui/core';
import { List, ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	paper: {
		textAlign: 'center',
		padding: theme.spacing(1),

	},
	list: {
		width: '100%',
	    maxWidth: 250,
	    backgroundColor: theme.palette.background.paper
	},
	alignItemsFlexStart: {
		justifyContent: "flex-end",
	}
}));

const PopoverPage = ({ dataUser, history }) => {

	const classes = useStyles();

	const [ theme ] = styleMaterialUiTheme();

	const [anchorEl, setAnchorEl] = useState(null);
	
	return (
		<ThemeProvider theme={theme}>
			<div className="d-inline-block pointer">
				<div onClick={event => setAnchorEl(event.currentTarget)}>
					<AccountCircleIcon fontSize="large" />
			
					<Typography
						variant="body1"
						component="span"
						className="ml-2"
					>
						{ dataUser.name } { dataUser.lastName }
					</Typography>
				</div>

				<Popover
					id={Boolean(anchorEl) ? 'simple-popover' : undefined}
					open={Boolean(anchorEl)}
					anchorEl={anchorEl}
					onClose={() => setAnchorEl(null)}
					 classes={{ paper: classes.paper }}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
				>
					<div className={classes.list}>
						<List component="nav" aria-label="main mailbox folders">
							<ListItem
								onClick={() => history.push('/mi-perfil')}
								className="pointer"
							>
								<ListItemIcon>
				            		<AccountCircleIcon
				            			fontSize="large"
				            			color="secondary"
				            		/>
				         		</ListItemIcon>

								<ListItemText
									color="secondary"
									primary={`${dataUser.name} ${dataUser.lastName}`}
									secondary={dataUser.email}
								/>
							</ListItem>
						</List>

						<Divider />

						<List component="nav" aria-label="secondary mailbox folders">
							<ListItem
								button
								onClick={() => history.push('/notificaciones')}
							>
								<ListItemText primary="Notificaciones" />
								<Badge color="primary" badgeContent={0} showZero></Badge>
							</ListItem>

							<ListItem
								button
								onClick={() => history.push('/mensajes')}
							>
								<ListItemText primary="Mensajes" />
								<Badge color="primary" badgeContent={0} showZero></Badge>
							</ListItem>
						</List>

						<Divider />

						<List component="nav" aria-label="secondary mailbox folders">
							<ListItem
								button
								onClick={() => history.push('/mis-productos')}
							>
								<ListItemText primary="Mis productos" />
							</ListItem>

							<ListItem
								button
								onClick={() => history.push('/crear-producto')}
							>
								<ListItemText primary="Crear producto" />

								<ListItemIcon className={classes.alignItemsFlexStart}>
				            		<AddCircleOutlineIcon
				            			fontSize="small"
				            			color="secondary"
				            		/>
				         		</ListItemIcon>
							</ListItem>
						</List>

						<Divider />

						<List component="nav" aria-label="secondary mailbox folders">
							<ListItem
								button
								onClick={() => history.push('/editar-perfil')}
							>
								<ListItemText primary="Editar perfi" />

								<ListItemIcon className={classes.alignItemsFlexStart}>
				            		<SettingsIcon
				            			fontSize="small"
				            			color="secondary"
				            		/>
				         		</ListItemIcon>
							</ListItem>

							<ListItem button>
								<ListItemText primary="Cerrar sesion" />

								<ListItemIcon className={classes.alignItemsFlexStart}>
				            		<PowerSettingsNewIcon
				            			fontSize="small"
				            			color="secondary"
				            		/>
				         		</ListItemIcon>
							</ListItem>
						</List>
					</div>
				</Popover>
			</div>
		</ThemeProvider>
	)
}

export default PopoverPage;