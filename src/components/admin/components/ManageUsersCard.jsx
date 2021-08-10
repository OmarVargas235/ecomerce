import React from 'react';
import moment from 'moment';

import { styleMaterialUiTheme } from '../../../utils/styleMaterialUi';
import { links } from '../../../utils/links';
import SelectionMenu from '../../../layaut/SelectionMenu';
import { ManageUsersCardStyle } from '../style';

import { Typography, Avatar, Button } from '@material-ui/core';
import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const ManageUsersCard = ({ dataSelected, message="" }) => {

	const theme = styleMaterialUiTheme();
	const matches = useMediaQuery('(max-width: 415px)');
	
	const handleChange = select => {

		console.log(select);
	}
	
	return (
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
							Role: { dataSelected.role.split('_')[0] }
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

						<SelectionMenu
							categorys={['MODERADOR', 'USUARIO']}
							// value={data.map(product => product['_id'])}
							title='Cambiar rol'
							setChange={handleChange}
						/>
					</CardContent>
					
					<CardActions className="d-flex justify-content-center">
						<Button variant="contained" size="small" color="secondary">
							Cambiar de rol
						</Button>

						<Button variant="contained" size="small" color="secondary">
							Eliminar usuario
						</Button>
					</CardActions>
				</Card>
			</ThemeProvider>
		</ManageUsersCardStyle>
	)
}

export default ManageUsersCard;