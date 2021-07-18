import React from 'react';

import { TealButton } from '../../../utils/styleMaterialUi';
import { TextareaStyle } from '../style';
import ImagesTextarea from '../container/ImagesTextarea';

import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import SendIcon from '@material-ui/icons/Send';

const SendMessagePage = ({ handleChange, handleChangeImg, isFocus, images, previewImages, state, selectedOption, setIsFocus, text, writeMessage }) => (
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
					className="pointer"
					style={{cursor: (text.length > 0 || previewImages.length > 0) && 'not-allowed'}}
				/>
				
				<input
					name="upload-img"
					type="file"
					className="upload-img pointer"
					onChange={handleChangeImg}
					disabled={text}
					style={{display: (text.length || previewImages.length > 0) > 0 && 'none'}}
				/>
			</div>
		</div>
		
		<form onSubmit={writeMessage}>
			<TextareaStyle isFocus={isFocus}>

				<ImagesTextarea
					handleChangeImg={handleChangeImg}
					files={images}
					previewImages={previewImages}
				/>

				<textarea
					placeholder="Escribir mensaje..."
					className="px-3 py-0 mt-4 w-100"
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