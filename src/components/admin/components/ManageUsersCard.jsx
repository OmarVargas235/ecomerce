import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { logoutUser } from '../../../redux/actions/userAction';
import { styleMaterialUiTheme } from '../../../utils/styleMaterialUi';
import { links } from '../../../utils/links';
import { requestWithToken } from '../../../utils/fetch';
import { alert } from '../../../utils/alert';
import SelectionMenu from '../../../layaut/SelectionMenu';
import { ManageUsersCardStyle } from '../style';

import { Typography, Avatar, Button } from '@material-ui/core';
import { Card, CardHeader, CardContent, CardActions } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const ManageUsersCard = ({ dataSelected, message="" }) => {
	
	const dispatch = useDispatch();
	const { auth:{token} } = useSelector(state => state.user);

	const theme = styleMaterialUiTheme();
	const matches = useMediaQuery('(max-width: 415px)');

	const [rol, setRol] = useState('');
	const [selectRol, setSelectRol] = useState('');

	// dataSelected.role.split('_')[0]

	useEffect(() => {
		
		const { role } = dataSelected;
		const clearRol = role.split('_')[0];

		setRol(clearRol);
		
	}, [dataSelected]);
		
	const handleChange = select => setSelectRol(select);

	const changeRol = async () => {

		if (selectRol.length === 0 || selectRol === dataSelected.role) return;

		dataSelected.role = selectRol;
			
		const formData = new FormData();
		formData.append('user', JSON.stringify(dataSelected));

		const { ok, messages, isExpiredToken } = await requestWithToken('change-rol-user', token, formData, 'PUT');

		if (isExpiredToken) {
			
			dispatch( logoutUser() );
			alert('error', messages);

			return;
		}

		if (!ok) return alert('error', messages);
		
		const { message, role } = messages;
		
		setRol(role);
		alert('success', message);
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

							<Button variant="contained" size="small" color="secondary">
								Banear usuario
							</Button>
						</CardActions>
					}
				</Card>
			</ThemeProvider>
		</ManageUsersCardStyle>
	)
}

export default ManageUsersCard;