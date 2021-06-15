import React from 'react';

import { MessagesStyle } from '../style';
import SelectionMenu from '../../../layaut/SelectionMenu';
import HeaderPage from './HeaderPage';
import SearchMessagePage from './SearchMessagePage';
import MessagesPage from './MessagesPage';
import MenuThreePoints from '../../../layaut/MenuThreePoints';
import SendMessagePage from './SendMessagePage';
import MessagesChatPage from './MessagesChatPage';

import { Typography, Grid, Avatar, Divider, Hidden } from '@material-ui/core';

const ChatPage = ({ matchesContainerMessages, selectedMessage, setSelectedMessage }) => (
	<MessagesStyle>
		
		<HeaderPage />

		<Grid container>
			<Grid 
				item 
				xs={matchesContainerMessages ? 12 : 5}
				className={`py-4 divider-vertical pl-md-4 ${matchesContainerMessages ? 'px-5' : ''}`}
			>
				<Hidden mdDown={!matchesContainerMessages}>
					<SelectionMenu
						categorys={['Todos los mensajes', 'Sin leer']}
						title="Categorias"
					/>
				</Hidden>
				
				
				<SearchMessagePage />
				
				<Hidden mdDown={matchesContainerMessages}>
					<Divider className="divider my-4" />
				</Hidden>
				
				<Hidden mdDown={matchesContainerMessages}>
					<div className="container__messages pr-2">
						{
							[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el, index) => (
								<MessagesPage
									key={index}
									setSelectedMessage={setSelectedMessage}
								/>
							))
						}
					</div>
				</Hidden>
			</Grid>	

			<Grid
				item
				xs={matchesContainerMessages ? 12 : 7}
				className="d-flex flex-column justify-content-between chat py-3"
			>
				{
					selectedMessage
					? <React.Fragment>
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
							
							<MenuThreePoints
								options={['Marcar como leido', 'Marcar como no leido', 'Bloquear']}
							/>
						</div>

						<Divider className="divider mb-4" />

						<div className="container__messsage-send px-3">
							{
								[1, 2].map((el, index) => (
									<MessagesChatPage key={index} index={index} />	
								))
							}
						</div>

						<Divider className="divider my-2" />

						<SendMessagePage />
					</React.Fragment>
					: <Typography
						variant="subtitle1"
						component="h6"
						className="font-weight-bold text-center"
					>
						Selecciona una cadena de mensajes para leerla aquí.
					</Typography>
				}
			</Grid>
		</Grid>
	</MessagesStyle>	
)

export default ChatPage;	