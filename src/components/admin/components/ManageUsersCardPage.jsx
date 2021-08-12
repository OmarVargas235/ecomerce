import React from 'react';
import moment from 'moment';

import { links } from '../../../utils/links';
import SelectionMenu from '../../../layaut/SelectionMenu';
import { ManageUsersCardStyle } from '../style';

import { Typography, Avatar, Button } from '@material-ui/core';
import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const ManageUsersCard = ({ ban, banUser, changeRol, dataSelected, handleChange, matches, rol, theme }) => (
	<ManageUsersCardStyle>
		<ThemeProvider theme={theme}>
			<Card className={`mt-5 py-2 ${matches ? '' : 'mx-5'}`} raised={true}>
				<CardHeader
					className="text-capitalize"
					avatar={
						dataSelected.img
						? <img className="img-user mb-3" src={`http://localhost:5000/${dataSelected.img}`}alt="img" />
						: <Avatar aria-label="recipe">
							{dataSelected.name.charAt(0).toUpperCase()}
						</Avatar>
					}
					title={dataSelected.name + ' ' + dataSelected.lastName}
					subheader={moment(new Date(), "YYYYMMDD").format('LL')}
				/>
				
				<CardContent>
					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
						className={`${dataSelected.description ? 'mb-4' : ''}`}
					>
						{dataSelected.description}
					</Typography>
					
					<Typography variant="body2" color="textSecondary" component="p">
						Role: <b style={{color: 'black'}}>{ rol }</b>
					</Typography>

					<Typography variant="body2" color="textSecondary" component="p">
						Ventas: { dataSelected.sales }
					</Typography>

					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
						className="d-flex align-items-center mb-4"
					>
						Redes sociales: {
							dataSelected.socialMedias.map((social, index) => (
								<a
									key={index}
									className="link ml-2 pointer d-flex justify-content-center align-items-center"
									href={social.link}
									target="_blank"
									rel = "noreferrer"
								>
									{ links[social.title] }
								</a>
							))
						}
					</Typography>
					
					{
						dataSelected.role === 'ADMIN_ROLE' ? null
						: <SelectionMenu
							categorys={['USUARIO', 'MODERADOR']}
							value={['USER_ROLE', 'MODERATOR_ROLE']}
							title='Cambiar rol'
							setChange={handleChange}
						/>
					}
				</CardContent>

				{
					dataSelected.role === 'ADMIN_ROLE' ? null
					: <CardActions className="d-flex justify-content-center">
						<Button
							variant="contained"
							size="small"
							color="secondary"
							onClick={changeRol}
						>
							Cambiar de rol
						</Button>

						<Button
							variant="contained"
							size="small"
							color="secondary"
							onClick={banUser}
						>
							{ ban }
						</Button>
					</CardActions>
				}
			</Card>
		</ThemeProvider>
	</ManageUsersCardStyle>
)

export default ManageUsersCard;