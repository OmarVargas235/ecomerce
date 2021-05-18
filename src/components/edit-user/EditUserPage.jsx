import React from 'react';

import { TealButton } from '../../utils/styleMaterialUi';
import { EditUserStyle } from './style';

import { Input, TextareaAutosize, Divider } from '@material-ui/core';

const socialRedsLinks = [ 
	{link: 'http://twitter.com/', typeSocialRed: 'Twitter'},
	{link: 'http://www.facebook.com/', typeSocialRed: 'Facebook'},
	{link: 'https://www.instagram.com/', typeSocialRed: 'Instagram'},
	{link: 'http://www.youtube.com/', typeSocialRed: 'Youtube'},
]

const EditUserPage = () => (

	<EditUserStyle className="pt-4 text-center">
		<form>
			<div className="px-4">
				<Input
					disableUnderline
					className="w-100 mb-3 px-5"
					placeholder="Nombre de usuario"
					name="name"
					type="text"
				/>
				
				<Input
					disableUnderline
					className="w-100 mb-3 px-5"
					placeholder="Apellido de usuario"
					name="price"
					type="text"
				/>
				
				<Input
					disableUnderline
					className="w-100 mb-3 px-5"
					name="img-product"
					type="file"
				/>

				<div className="px-5">
					<TextareaAutosize
						className="w-100 mb-3 px-3"
						rowsMin={6}
						placeholder="Escribe alguna descripcion sobre ti o tu negocio"
					/>
				</div>
			</div>

			<Divider light />

			<div className="mx-4 pt-4 px-5 container__url">
				<h5 className="text-left mb-4">Enlaces:</h5>

				<Input
					disableUnderline
					className="w-100 mb-3"
					placeholder="Pagina web: (http(s)://..)"
					name="price"
					type="text"
				/>
				
				{
					socialRedsLinks.map((socialRed, index) => (
						
						<div className="d-flex mb-3" key={index}>
							<span
								className="url p-2 d-flex justify-content-center align-items-center"
							>{socialRed.link}</span>

							<Input
								disableUnderline
								className="w-100"
								placeholder={`Perfil de ${socialRed.typeSocialRed} (ej. eugenio)`}
								name="name"
								type="text"
							/>
						</div>
					))
				}
			</div>

			<Divider light />

			<div className="mt-3 px-4 mr-5 text-right">
				<TealButton variant="contained">guardar cambios</TealButton>
			</div>
		</form>
	</EditUserStyle>
)

export default EditUserPage;