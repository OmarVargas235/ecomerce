import React from 'react';

import { EditImgProfileStyle } from './style';

import { FormControl, Input, Typography } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

const EditImgProfilePage = ({ handleChange, previewImage }) => (
	<React.Fragment>
		<EditImgProfileStyle className="container my-4">
			<Typography variant="subtitle1" className="mb-3">
				Vista previa de imagen
			</Typography>

			<div className="container__img-prev p-4">
				<div className="container__icon-user text-center py-3">
					{
						previewImage === '' ? <AccountCircleOutlinedIcon />
						: <img src={previewImage} alt="imagen previa" />
					}
				</div>
			</div>

			<FormControl className="w-100 my-4">
				<Input
					disableUnderline
					name="img-user"
					type="file"
					onChange={handleChange}
				/>
			</FormControl>
		</EditImgProfileStyle>
	</React.Fragment>
)

export default EditImgProfilePage;