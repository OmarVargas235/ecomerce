import React from 'react';

import { ProfileStyle } from './style';
import Spinner from '../../layaut/Spinner';

import { Grid, Typography, Hidden } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AttachmentIcon from '@material-ui/icons/Attachment';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import StarIcon from '@material-ui/icons/Star';

const links = {
	'Sitio Web': <AttachmentIcon className="mr-2" />,
	'Twitter': <TwitterIcon className="mr-2" />,
	'Facebook': <FacebookIcon className="mr-2" />,
	'Instagram': <InstagramIcon className="mr-2" />,
	'Youtube': <YouTubeIcon className="mr-2" />,
}

const ProfilePage = ({ dataUser, matches }) => (
	<ProfileStyle className="my-4 container">
		{
			Object.keys(dataUser).length === 0 ? <Spinner />
			: <Grid container>
				<Grid item sm={8} className="order-2 order-sm-0 mt-5 mt-sm-0">
					<Typography variant="h3" component="h3" className="font-weight-bold" paragraph>
						{dataUser.name}
					</Typography>

					<div className="d-flex my-4">
						<span className="mr-4">
							<Typography variant="body1" component="p" className="font-weight-bold bold">
								Total de ventas
							</Typography>

							<Typography variant="h6" component="p">
								344.531
							</Typography>
						</span>

						<span>
							<Typography variant="body1" component="p" className="font-weight-bold bold">
								Valoraciones del 1 al 5
							</Typography>

							<Typography variant="h6" component="p">
								3
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
								
								<div className="link w-100 p-4 d-flex justify-content-center align-items-center mb-2" key={index}>
									{ links[social.title] }
									<span className="font-weight-bold">{social.title}</span>
								</div>
							))
						}
					</Hidden>
				</Grid>

				<Grid item sm={4} container justify={matches ? 'flex-start' : 'center'} className="px-md-4 px-lg-5 order-0">
					{
						!dataUser.img 
						? <AccountCircleIcon className="img-user mb-3" />
						: <img className="img-user mb-3" src={`http://localhost:5000/${dataUser.img}`}alt="img" />
					}
					
					<Hidden xsDown>
						{
							dataUser.socialMedias.length === 0 ? null
							: dataUser.socialMedias.map((social, index) => (
								
								<div className="link w-100 p-4 d-flex justify-content-center align-items-center mb-2" key={index}>
									{ links[social.title] }
									<span className="font-weight-bold">{social.title}</span>
								</div>
							))
						}
					</Hidden>

					<div className="w-100 mt-3 pl-4 pl-sm-0">
						<Typography variant="h6" component="p" paragraph>
							Reputacion
						</Typography>
						
						<div className="d-flex">
							<StarIcon />
							<StarIcon />
							<StarIcon />
							<StarIcon />
							<StarIcon />
						</div>
					</div>
				</Grid>
			</Grid>
		}
	</ProfileStyle>
)

export default ProfilePage;