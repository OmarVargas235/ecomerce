import React from 'react';

import { NotificationsStyle } from './style';

import { Avatar, Typography } from '@material-ui/core';

const NotificationsPage = () => (

	<NotificationsStyle className="container my-5">
		<div className="notifications px-1 py-3">
			<div className="d-flex">
				<Avatar className="mr-4">OP</Avatar>
				
				<Typography
					variant="body2"
					component="span"
					paragraph
					className="message-notification"
				>
					Fernando Herrera ha hecho un anuncio:
					<span className="font-weight-bold"> Saludos a todos, muchos éxitos en todo lo que se encuentren haciendoQuiero recordarles que tengo varias listas de reproducción muy útiles en YouTube que les pueden servir bastante como complemento de temas que enseño en UdemyNotificaciones Push - FlutterReact con TypeScript - Hooks y másManejo de imágenes en ReactLazyLoad en AngularFirebase - Firestore para SQL DevelopersEstas listas y otras las tengo en mi canal de YouTube, no se olviden que me dedico a subir contenido adicional en esa plataforma.También tengo un PodCast totalmente gratuito (gracias a las donaciones), en el cual hablo de temas tecnológicos o de interés en generalDevtalles - Fernando HerreraTodo esto es un extra que les puede servir mucho en su día a día!atte:Fernando Herrera

					</span>
				</Typography>
			</div>

			<Typography
					variant="body2"
					component="p"
					color="textSecondary"
					paragraph
					className="mb-0"
				>
					Hace un dia
			</Typography>
		</div>

		<Typography
			variant="body2"
			component="p"
			className="allRead mt-3"
			paragraph
		>
			Marcar todo como leido
		</Typography>
	</NotificationsStyle>
)

export default NotificationsPage;