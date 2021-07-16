import React from 'react';

import { TealButton } from '../../../utils/styleMaterialUi';
import { TextareaStyle } from '../style';

import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';
import AddToPhotosRoundedIcon from '@material-ui/icons/AddToPhotosRounded';

const SendMessagePage = ({ handleChange, handleChangeImg, isFocus, previewImages, state, selectedOption, setIsFocus, text, writeMessage }) => (
	<div className="container__write-message mx-3">
		<div className="d-flex container-icon p-2">
			<FormatBoldIcon
				className={`pointer mr-3 ${state.isBold ? 'isActive' : ''}`}
				onClick={() => selectedOption('bold')}
			/>

			<FormatItalicIcon
				className={`pointer mr-3 ${state.isCursive ? 'isActive' : ''}`}
				onClick={() => selectedOption('cursive')}
			/>
			<div className="container-upload-img">
				<AddPhotoAlternateIcon
					style={{cursor: (text.length > 0 || previewImages.length > 0) && 'not-allowed'}}
				/>
				
				<input
					name="upload-img"
					type="file"
					className="upload-img"
					onChange={handleChangeImg}
					disabled={text}
					style={{display: (text.length || previewImages.length > 0) > 0 && 'none'}}
				/>
			</div>
		</div>
		
		<form onSubmit={writeMessage}>
			<TextareaStyle isFocus={isFocus}>
				<div className="send-img-chat px-3 py-2">
					{
						previewImages === '' ? null
						: <div className="d-flex">
							<div className="container-images">
								<CancelIcon className="icon pointer" />
								<img src={previewImages} alt="imagen previa" /> 
							</div>
							
							<div className="container-images ml-2 addToImage d-flex justify-content-center align-items-center pointer">
								<AddToPhotosRoundedIcon />
							</div>
						</div>
					}
				</div>

				<textarea
					placeholder="Escribir mensaje..."
					className="px-3 py-0 w-100"
					type="text"
					name="message"
					onChange={handleChange}
					autoComplete="off"
					rows="3"
					onFocus={() => setIsFocus(true)}
					onBlur={() => setIsFocus(false)}
				></textarea>
			</TextareaStyle>

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