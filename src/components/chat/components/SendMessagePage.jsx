import React from 'react';

import { TealButton } from '../../../utils/styleMaterialUi';

import { Input } from '@material-ui/core';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import SendIcon from '@material-ui/icons/Send';

const SendMessagePage = ({ handleChange, isBold, isCursive, selectedOption, writeMessage }) => (
	<div className="container__write-message mx-3">
		<div className="d-flex container-icon p-2">
			<FormatBoldIcon
				className={`pointer mr-3 ${isBold ? 'isActive' : ''}`}
				onClick={() => selectedOption('bold')}
			/>

			<FormatItalicIcon
				className={`pointer mr-3 ${isCursive ? 'isActive' : ''}`}
				onClick={() => selectedOption('cursive')}
			/>

			<div className="container-upload-img">
				<AddPhotoAlternateIcon />
				
				<Input
					disableUnderline
					name="upload-img"
					type="file"
					className="upload-img"
					// onChange={handleChange}
				/>
			</div>
		</div>
		
		<form onSubmit={writeMessage} className="form-send-message">
			<input
				placeholder="Escribir mensaje.."
				className="search pl-1 w-100 p-0"
				type="text"
				name="message"
				onChange={handleChange}
				autoComplete="off"
			/>

			<TealButton
				variant="contained"
				className="mt-2"
				endIcon={<SendIcon />}
				type="submit"
			>
				Send
			</TealButton>
		</form>
	</div>
)

export default SendMessagePage;