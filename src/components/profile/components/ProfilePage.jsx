import React from 'react';

import { ProfileStyle } from '../style';
import Spinner from '../../../layaut/Spinner';
import LinksPage from './LinksPage';

import { Grid, Typography, Hidden } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StarIcon from '@material-ui/icons/Star';

const ProfilePage = ({ assessment, dataUser, matches }) => (
	<ProfileStyle className="my-4 container">
		{
			Object.keys(dataUser).length === 0 ? <Spinner />
			: <Grid container>
				<Grid item sm={8} className="order-2 order-sm-0 mt-5 mt-sm-0">
					<Typography variant="h3" component="h3" className="font-weight-bold" paragraph>
						{ dataUser.name } { dataUser.lastName }
					</Typography>

					<div className="d-flex my-4">
						<span className="mr-4">
							<Typography variant="body1" component="p" className="font-weight-bold bold">
								Total de ventas
							</Typography>

							<Typography variant="h6" component="p">
								{dataUser.sales}
							</Typography>
						</span>

						<span>
							<Typography variant="body1" component="p" className="font-weight-bold bold">
								Valoraciones del 1 al 5
							</Typography>

							<Typography variant="h6" component="p">
								{assessment}
							</Typography>
						</span>
					</div>

					<Typography variant="h6" component="p" paragraph>
						Sobre mí
					</Typography>
					
					{
						!dataUser.description 
						? <Typography variant="h6" component="p" paragraph>No hay descripcion</Typography>
						: dataUser.description.split('.').map((text, index) => (
							<Typography variant="body1" component="p" paragraph key={index}>
								{text.replace(/\b[\\n\\n]/g, '').replace(/[\\\\]/g, '')}.
							</Typography>
						))
					}

					<Hidden smUp>
						{
							dataUser.socialMedias.length === 0 ? null
							: dataUser.socialMedias.map((social, index) => (
								<LinksPage
									key={index}
									social={social}
								/>
							))
						}
					</Hidden>
				</Grid>

				<Grid item sm={4} container justify={matches ? 'flex-start' : 'center'} className="px-md-4 px-lg-5 order-0">
					{
						!dataUser.img 
						? <AccountCircleIcon className="img-user mb-3" />
						: <img className="img-user mb-3" src={`${process.env.REACT_APP_BACKEND_URL}/${dataUser.img}`}alt="img" />
					}
					
					<Hidden xsDown>
						{
							dataUser.socialMedias.length === 0 ? null
							: dataUser.socialMedias.map((social, index) => (
								<LinksPage
									key={index}
									social={social}
								/>
							))
						}
					</Hidden>

					<div className="w-100 mt-3 pl-4 pl-sm-0">
						<Typography variant="h6" component="p" paragraph>
							Reputacion
						</Typography>
						
						<div className="d-flex">
							<StarIcon color={`${assessment > 0 ? 'primary' : 'disabled'}`} />
							<StarIcon color={`${assessment > 1 ? 'primary' : 'disabled'}`} />
							<StarIcon color={`${assessment > 2 ? 'primary' : 'disabled'}`} />
							<StarIcon color={`${assessment > 3 ? 'primary' : 'disabled'}`} />
							<StarIcon color={`${assessment > 4 ? 'primary' : 'disabled'}`} />
						</div>
					</div>

					<Typography variant="h6" component="p" paragraph className="mt-3">
						Rol: { dataUser.role.match(/[a-z]+/gi)[0] }
					</Typography>

				</Grid>
			</Grid>
		}
	</ProfileStyle>
)

export default ProfilePage;