import React from 'react';

import { TealButton } from '../../../utils/styleMaterialUi';

import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import SendIcon from '@material-ui/icons/Send';

const SendMessagePage = () => (
	<div className="container__write-message mx-3">
		<div className="d-flex container-icon p-2">
			<FormatBoldIcon className="pointer mr-3" />
			<FormatItalicIcon className="pointer mr-3" />
			<AddPhotoAlternateIcon className="pointer" />
		</div>

		<form>
			<input
				placeholder="Escribir mensaje.."
				className="search pl-1 w-100 p-0"
				type="text"
			/>

			<TealButton
				variant="contained"
				className="mt-2"
				endIcon={<SendIcon />}
			>
				Send
			</TealButton>
		</form>
	</div>
)

export default SendMessagePage;