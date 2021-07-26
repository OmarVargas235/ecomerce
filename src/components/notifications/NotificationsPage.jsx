import React from 'react';
import moment from 'moment';
import 'moment/locale/es';

import { Avatar, Typography } from '@material-ui/core';

const NotificationsPage = ({ index, notification, selectNotification }) => (

	<div
		className={`notifications ${notification.view ? 'notification-new' : ''} px-1 py-3`}
		onClick={() => selectNotification(index)}
	>
		<div className="d-flex">
			{
				notification.img
				? <img 
					className="img-user mr-4"
					src={`http://localhost:5000/${notification.img}`}
					alt="img"
				/>
				: <Avatar className="mr-4">
					{notification.nameRemitter.charAt(0).toUpperCase()}
				</Avatar>
			}
			
			<Typography
				variant="body2"
				component="span"
				paragraph
				className="message-notification"
			>
				{notification.nameRemitter} a:
				{/*Fernando Herrera ha hecho un anuncio:*/}
				<span className="font-weight-bold ml-1">
					{notification.message}
			{/*Saludos a todos, muchos éxitos en todo lo que se encuentren haciendoQuiero recordarles que tengo varias listas de reproducción muy útiles en YouTube que les pueden servir bastante como complemento de temas que enseño en UdemyNotificaciones Push - FlutterReact con TypeScript - Hooks y másManejo de imágenes en ReactLazyLoad en AngularFirebase - Firestore para SQL DevelopersEstas listas y otras las tengo en mi canal de YouTube, no se olviden que me dedico a subir contenido adicional en esa plataforma.También tengo un PodCast totalmente gratuito (gracias a las donaciones), en el cual hablo de temas tecnológicos o de interés en generalDevtalles - Fernando HerreraTodo esto es un extra que les puede servir mucho en su día a día!atte:Fernando Herrera*/}
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
				{moment(new Date(notification.date), "YYYYMMDD").fromNow()}
		</Typography>
	</div>	
)

export default NotificationsPage;