import React from 'react';

import { links } from '../../../utils/links';

const LinksPage = ({ social }) => (
	<a 
		className="link w-100 p-4 d-flex justify-content-center align-items-center mb-2"
		href={social.link}
		target="_blank"
		rel = "noreferrer"
	>
		{ links[social.title] }
		<span className="font-weight-bold">{social.title}</span>
	</a>
)

export default LinksPage;