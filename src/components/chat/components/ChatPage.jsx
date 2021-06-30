import React from 'react';

import { MessagesStyle } from '../style';
import SelectionMenu from '../../../layaut/SelectionMenu';
import HeaderPage from './HeaderPage';
// import SearchMessagePage from './SearchMessagePage';
import SearchMessage from '../container/SearchMessage';
import MessagesChat from '../container/MessagesChat';
// import MessagesChatPage from './MessagesChatPage';
import RecordChat from '../container/RecordChat';
// import MessagesPage from './MessagesPage';
import MenuThreePoints from '../../../layaut/MenuThreePoints';
import SendMessagePage from './SendMessagePage';

import { Typography, Grid, Avatar, Divider, Hidden } from '@material-ui/core';

const ChatPage = ({ containerMesssageRef, contNewMessage, changeChat, dataUser, dispatch, handleChange, matchesContainerMessages, state, selectedOption, selectedUserChat, selectedMessage,writeMessage }) => (

	<MessagesStyle>
		
		<HeaderPage
			contNewMessage={contNewMessage}
		/>

		<Grid container>
			<Grid 
				item 
				xs={matchesContainerMessages ? 12 : 5}
				className={`py-4 divider-vertical pl-md-4 ${matchesContainerMessages ? 'px-5' : ''}`}
			>
				{
					matchesContainerMessages
					? <SelectionMenu
						categorys={['Todos los mensajes', 'Sin leer']}
						title="Categorias"
					/> : null
				}
				
				<SearchMessage
					containerMesssageRef={containerMesssageRef}
					dataUser={dataUser}
					dispatch={dispatch}
					state={state}
				/>
				
				<Hidden mdDown={matchesContainerMessages}>
					<Divider className="divider my-4" />
				</Hidden>
				
				<Hidden mdDown={matchesContainerMessages}>
					<div className="container__messages pr-2">
						<RecordChat
							state={state}
							changeChat={changeChat}
							dataUser={dataUser}
							dispatch={dispatch}
						/>
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

								<div
									className="container__messsage-send px-3"
									ref={containerMesssageRef}
								>
									<MessagesChat
										containerMesssageRef={containerMesssageRef}
										dispatch={dispatch}
										dataUser={dataUser}
										state={state}
									/>
								</div>

								<Divider className="divider my-2" />

								<SendMessagePage
									handleChange={handleChange}
									isBold={state.isBold}
									isCursive={state.isCursive}
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