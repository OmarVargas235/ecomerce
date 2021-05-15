import React from 'react';

import { ProfileStyle } from './style';

import { Grid, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AttachmentIcon from '@material-ui/icons/Attachment';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import StarIcon from '@material-ui/icons/Star';

const links = [
	{icon: <AttachmentIcon className="mr-2" />, title: 'Sitio Web'},
	{icon: <TwitterIcon className="mr-2" />, title: 'Twitter'},
	{icon: <FacebookIcon className="mr-2" />, title: 'Facebook'},
	{icon: <InstagramIcon className="mr-2" />, title: 'Instagram'},
	{icon: <YouTubeIcon className="mr-2" />, title: 'Youtube'},
]

const ProfilePage = () => (
	<ProfileStyle className="my-4 container">
		<Grid container>
			<Grid item xs={9}>
				<Typography variant="h3" component="h3" className="font-weight-bold" paragraph>
					Omar Vargas
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

				<div>
					<Typography variant="h6" component="p" paragraph>
						Sobre mí
					</Typography>

					<Typography variant="body1" component="p" paragraph>
						Soy un analista de sistemas de computo, con poco más de 18 años en el mundo del desarrollo de aplicaciones de todo tipo.
					</Typography>

					<Typography variant="body1" component="p" paragraph>
						Me encanta programar, crear aplicaciones que la gente use, me gusta enseñar, también fui maestro sustituto en las clases de programación, soy autor de código en Envato Marketplace.
					</Typography>

					<Typography variant="body1" component="p" paragraph>
						Aquí en Udemy, he tenido la increíble experiencia de poder enseñar a muchos alumnos, y espero seguir mejorando mis cursos y los temas conforme la actualidad vaya cambiando.
					</Typography>
				</div>
			</Grid>

			<Grid item xs={3}>
				<AccountCircleIcon className="img-user" />

				{
					links.map(links => (
						
						<div className="link w-100 p-4 d-flex justify-content-center align-items-center mb-2" key={links.title}>
							{ links.icon }
							<span className="font-weight-bold">{ links.title }</span>
						</div>
					))
				}

				<Typography variant="h6" component="p" paragraph className="mt-4">
					Reputacion
				</Typography>

				<div className="d-flex">
					<StarIcon />
					<StarIcon />
					<StarIcon />
					<StarIcon />
					<StarIcon />
				</div>
			</Grid>
		</Grid>
	</ProfileStyle>
)

export default ProfilePage;