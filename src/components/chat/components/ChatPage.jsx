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

const ChatPage = ({ chats, dataUser, handleChange, isBold, isCursive, matchesContainerMessages, messages, selectedOption, selectedUserChat, selectedMessage, changeChat, viewMessage, writeMessage }) => (
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
							chats.map((el, index) => (
								<MessagesPage
									key={index}
									data={el}
									idUser={dataUser.uid}
									changeChat={changeChat}
									viewMessage={viewMessage}
									// viewMessage={ viewMessage && 
									// 	( (selectedUserChat.id || selectedUserChat['_id']) 
									// 	=== el.of ||
									// 	(selectedUserChat.id||selectedUserChat['_id'])
									// 	=== el.for )
									// }
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
					Object.keys(selectedUserChat).length === 0
					? <div className="text-center mt-5 pt-5 not-read-message">Selecciona una cadena de mensajes para leerla aquí.</div>
					: <React.Fragment>
						{
							selectedMessage
							? <React.Fragment>
								<div className="d-flex justify-content-between px-4">
									<div className="d-flex align-items-center">
										<Avatar
											className="mr-4 text-uppercase"
										>{selectedUserChat.name.charAt(0)}</Avatar>
										
										<Typography
											variant="subtitle1"
											component="span"
											className="font-weight-bold text-capitalize"
										>
											{selectedUserChat.name} {selectedUserChat.lastName}
										</Typography>
									</div>
									
									<MenuThreePoints
										handleChange={selectedOption}
										options={['Marcar como leido', 'Marcar como no leido', 'Bloquear']}
									/>
								</div>

								<Divider className="divider mb-4" />

								<div className="container__messsage-send px-3">
									{
										messages.map(el => (
											<MessagesChatPage
												key={el['_id']}
												idUser={dataUser.uid}
												message={el}
											/>	
										))
									}
								</div>

								<Divider className="divider my-2" />

								<SendMessagePage
									handleChange={handleChange}
									isBold={isBold}
									isCursive={isCursive}
									selectedOption={selectedOption}
									writeMessage={writeMessage}
								/>
							</React.Fragment>
							: <Typography
								variant="subtitle1"
								component="h6"
								className="font-weight-bold text-center"
							>
								Selecciona una cadena de mensajes para leerla aquí.
							</Typography>
						}
					</React.Fragment>
				}
			</Grid>
		</Grid>
	</MessagesStyle>	
)

export default ChatPage;	