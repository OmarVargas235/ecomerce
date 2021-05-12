import React, { useState } from 'react';

import { styleMaterialUiTheme } from '../../../utils/styleMaterialUi';

import { Typography, Popover, Badge } from '@material-ui/core';
import { List, ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
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
	}
}));

const PopoverPage = ({ dataUser }) => {

	const classes = useStyles();

	const [ theme ] = styleMaterialUiTheme();

	const [anchorEl, setAnchorEl] = useState(null);
	
	return (
		<ThemeProvider theme={theme}>
			<div className="d-inline-block pointer mr-5">
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
							<ListItem>
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
							<ListItem button>
								<ListItemText primary="Notificaciones" />
								<Badge color="primary" badgeContent={0} showZero></Badge>
							</ListItem>

							<ListItem button>
								<ListItemText primary="Mensajes" />
								<Badge color="primary" badgeContent={0} showZero></Badge>
							</ListItem>
						</List>

						<Divider />

						<List component="nav" aria-label="secondary mailbox folders">
							<ListItem button>
								<ListItemText primary="Mis articulos" />
							</ListItem>

							<ListItem button>
								<ListItemText primary="Crear articulo" />
							</ListItem>
						</List>

						<Divider />

						<List component="nav" aria-label="secondary mailbox folders">
							<ListItem button>
								<ListItemText primary="Editar perfi" />

								<ListItemIcon>
				            		<SettingsIcon
				            			fontSize="small"
				            			color="secondary"
				            		/>
				         		</ListItemIcon>
							</ListItem>

							<ListItem button>
								<ListItemText primary="Cerrar sesion" />

								<ListItemIcon>
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