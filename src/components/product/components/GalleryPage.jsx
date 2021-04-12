import React from 'react';

import ModalImgPage from './ModalImgPage';

import { Grid } from '@material-ui/core';

const GalleryPage = ({ changeImg, handleClose, handleClickOpen, items, indexCarrousel, name, openModal, setChangeImg }) => (
	<Grid container spacing={3}>
		<Grid item sm={1} className="galerry">
			<div
				className={`container-img mb-2 pointer ${changeImg.id === items[0].id ?'active' : ''}`}
				onMouseEnter={() => setChangeImg( { img: items[0].img, id: items[0].id } )}
			>
				<img src={items[0].img} alt={name} className="img-fluid" />
			</div>

			<div
				className={`container-img mb-2 pointer ${changeImg.id === items[1].id ?'active' : ''}`}
				onMouseEnter={() => setChangeImg( { img: items[1].img, id: items[1].id } )}
			>
				<img src={items[1].img} alt={name} className="img-fluid" />
			</div>

			<div
				className={`container-img mb-2 pointer ${changeImg.id === items[2].id ?'active' : ''}`}
				onMouseEnter={() => setChangeImg( { img: items[2].img, id: items[2].id } )}
			>
				<img src={items[2].img} alt={name} className="img-fluid" />
			</div>

			<div
				className={`container-img mb-2 pointer ${changeImg.id === items[3].id ?'active' : ''}`}
				onMouseEnter={() => setChangeImg( { img: items[3].img, id: items[3].id } )}
			>
				<img src={items[3].img} alt={name} className="img-fluid" />
			</div>

			<div
				className={`container-img pointer ${changeImg.id === items[4].id ?'active' : ''}`}
				onMouseEnter={() => setChangeImg( { img: items[4].img, id: items[4].id } )}
			>
				<img src={items[4].img} alt={name} className="img-fluid" />
			</div>
		</Grid>

		<Grid item sm={11} className="text-center">
			<img
				src={changeImg.img}
				alt={name}
				className="img-fluid text-center zoom-in"
				onClick={handleClickOpen}
			/>
			
			<ModalImgPage
				handleClose={handleClose}
				items={items}
				indexCarrousel={indexCarrousel}
				openModal={openModal}
			/>
		</Grid>
	</Grid>
)

export default GalleryPage;