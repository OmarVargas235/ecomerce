import React from 'react';

import { Input } from '@material-ui/core';

const socialRedsLinks = [ 
	{link: 'http://twitter.com/', typeSocialRed: 'Twitter', name: 'twitter'},
	{link: 'http://www.facebook.com/', typeSocialRed: 'Facebook', name: 'facebook'},
	{link: 'https://www.instagram.com/', typeSocialRed: 'Instagram', name: 'instagram'},
	{link: 'http://www.youtube.com/', typeSocialRed: 'Youtube', name: 'youtube'},
]

const SocialMediaPage = ({ formRef }) => (
	<div className="mx-4 pt-4 px-5 container__url">
		<h5 className="text-left mb-4">Enlaces:</h5>

		<Input
			disableUnderline
			className="w-100 mb-3"
			placeholder="Pagina web: (http(s)://..)"
			name="webPage"
			type="text"
			autoComplete="off"
			ref={formRef.webPage}
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
						name={socialRed.name}
						type="text"
						autoComplete="off"
						ref={formRef[socialRed.name]}
					/>
				</div>
			))
		}
	</div>
)

export default SocialMediaPage;