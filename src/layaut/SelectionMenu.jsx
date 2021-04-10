import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	formControl: {
		marginBottom: theme.spacing(1),
		minWidth: 120,
	},
}));

const SelectionMenu = ({ categorys, value=[], title }) => {

	const classes = useStyles();
	const [category, setCategory] = useState('');
  	const [openSelect, setOpen] = useState(false);

  	const handleChange = (event, newValue) => setCategory(event.target.value);

  	const handleClose = () => setOpen(false);
  	const handleOpen = () => setOpen(true);
	
	return (
		<FormControl className={`w-100 pr-3 ${classes.formControl}`}>
			<InputLabel
				color="secondary"
				id="demo-controlled-open-select-label"
				className="ml-2"
			>{title}</InputLabel>

			<Select
				labelId="demo-controlled-open-select-label"
				id="demo-controlled-open-select"
				open={openSelect}
				onClose={handleClose}
				onOpen={handleOpen}
				value={category}
				onChange={handleChange}
				color="secondary"
			>
				<MenuItem value="">
					<em>{ title }</em>
				</MenuItem>

				{
					categorys.map((category, index) => (

						<MenuItem
							value={value.length === 0 ? category : value[index]}
							key={index}
						>{category}</MenuItem>
					))
				}
			</Select>
		</FormControl>
	)
}

export default SelectionMenu;