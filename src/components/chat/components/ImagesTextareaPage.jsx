import React from 'react';

import CancelIcon from '@material-ui/icons/Cancel';
import AddToPhotosRoundedIcon from '@material-ui/icons/AddToPhotosRounded';

const ImagesTextareaPage = ({ deleteImagePreview, handleChangeImg, previewImages }) => (
	<React.Fragment>	
		{
			previewImages.length === 0 ? null
			: <div className="container-images px-3 py-2 d-flex">
				{
					previewImages.map((img, index) => (
						<div
							className={`container-images__img ${index > 0 ? 'ml-2' : ''}`}
							key={index}
						>
							<CancelIcon
								className="icon pointer"
								onClick={() => deleteImagePreview(index)}
							/>
							<img src={img} alt={`previa-${index}`} /> 
						</div>
					))
				}
				
				<div className="container-add-image ml-2 pr-3">
					<div className="container-images__img addToImage d-flex justify-content-center align-items-center pointer">
						<AddToPhotosRoundedIcon />
					</div>
					
					<input
						name="upload-img"
						type="file"
						className="upload-img pointer"
						multiple
						onChange={handleChangeImg}
					/>
				</div>
			</div>
		}
	</React.Fragment>
)

export default ImagesTextareaPage;