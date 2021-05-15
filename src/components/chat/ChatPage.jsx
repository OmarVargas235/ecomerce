import React from 'react';

import { MessagesStyle } from './style';
import { TealButton } from '../../utils/styleMaterialUi';

import { Typography, Grid, Avatar, Divider, Menu } from '@material-ui/core';
import { IconButton, MenuItem } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import SendIcon from '@material-ui/icons/Send';

const ChatPage = ({ setAnchorEl, anchorEl, open }) => (
	<MessagesStyle>
		<header className="header pl-5 py-4">
			<Typography
				variant="h4"
				component="h4"	
			>
				Mensajes
			</Typography>
			
			<Typography
				variant="body1"
				component="p"
			>
				Tienes 4 mensajes sin leer.
			</Typography>
		</header>

		<Grid container>
			<Grid item xs={5} className="py-4 divider-vertical pl-4">
				<div className="d-flex mr-4">
					<input
						placeholder="Buscar"
						className="search pl-3 w-100"
						type="text"
					/>

					<div className="container-icon-search d-flex justify-content-center align-items-center">
						<SearchIcon />
					</div>
				</div>
				
				<Divider className="divider my-4" />

				<div className="container__messages pr-2">
					{
						[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el, index) => (
							<div className="message pl-3 p-2 mb-1 pointer" key={index}>
								<div className="profile d-flex justify-content-between">
									<div className="d-flex">
										<Avatar className="avatar mr-2">H</Avatar>
										
										<Typography
											variant="subtitle1"
											component="span"
											className="name font-weight-bold"
										>
											Omar Vargas
										</Typography>
									</div>
									
									<Typography
										variant="subtitle1"
										component="span"
									>
										Hace 9 meses
									</Typography>
								</div>

								<div className="text mt-3 d-flex">
									<span>¡Hola! Muchas gracias por inscribirte a este curso...</span>
									<DeleteForeverIcon className="icon pointer" />
								</div>
							</div>
						))
					}
				</div>
			</Grid>

			<Grid item xs={7} className="chat py-3">
				<div className="d-flex justify-content-between px-4">
					<div className="d-flex align-items-center">
						<Avatar className="mr-4">H</Avatar>
						
						<Typography
							variant="subtitle1"
							component="span"
							className="font-weight-bold"
						>
							Omar Vargas
						</Typography>
					</div>

					<div>
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
					</div>
				</div>

				<Divider className="divider my-4" />

				<div className="container__messsage-send px-3">
					{
							[1, 2].map((el, index) => (
								<div
									className={`${index === 0 ? 'message-received' : 'message-send'} px-3 py-2 mb-2`}
									key={index}
								>
									<Typography
										variant="subtitle2"
										component="p"
										className="font-weight-normal"
									>
										hace 9 meses
									</Typography>

									<Typography
										variant="subtitle2"
										component="span"
										className="font-weight-normal"
									>
										¡Hola! Muchas gracias por inscribirte a este curso que estoy seguro que será de tu agrado. Cualquier duda que tengas estoy disponible mediante el panel de preguntas y respuestas para ayudarte.
									</Typography>
								</div>		
							))
						}
				</div>

				<Divider className="divider my-2" />

				<div className="container__write-message mx-3">
					<div className="d-flex container-icon p-2">
						<FormatBoldIcon className="pointer mr-3" />
						<FormatItalicIcon className="pointer mr-3" />
						<AddPhotoAlternateIcon className="pointer" />
					</div>

					<form>
						<input
							placeholder="Escribir mensaje.."
							className="search pl-1 w-100 p-0"
							type="text"
						/>

						<TealButton
							variant="contained"
							className="mt-2"
							endIcon={<SendIcon />}
						>
							Send
						</TealButton>
					</form>
				</div>
			</Grid>
		</Grid>
	</MessagesStyle>	
)

export default ChatPage;	