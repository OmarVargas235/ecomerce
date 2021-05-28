import React from 'react';

import ModalImgPage from './ModalImgPage';

import { Grid } from '@material-ui/core';

const GalleryPage = ({ changeImg, handleClose, handleClickOpen, images, name, openModal,setChangeImg }) => (
	<Grid container spacing={3}>
		<Grid item sm={1} className="galerry">
			{
				images.map((img, index) => (
					<div
						className={`container-img mb-2 pointer ${changeImg.img === img ?'active' : ''}`}
						onMouseEnter={() => setChangeImg({img, index})}
						key={index}
					>	
						<img src={`http://localhost:5000/${img}`} alt={name} className="img-fluid" />
					</div>
				))
			}
		</Grid>

		<Grid item sm={11} className="text-center">
			<img
				src={`http://localhost:5000/${changeImg.img}`}
				alt={name}
				className="img-fluid text-center zoom-in"
				onClick={handleClickOpen}
			/>
			
			<ModalImgPage
				handleClose={handleClose}
				indexImg={changeImg.index}
				images={images}
				name={name}
				openModal={openModal}
			/>
		</Grid>
	</Grid>
)

export default GalleryPage;