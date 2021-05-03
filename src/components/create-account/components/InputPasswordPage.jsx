import React, { useState } from 'react';

import { IconButton, FormControl, InputLabel, Input, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const InputPasswordPage = ({ formData, handleChange, isRquerid, text, typeName }) => {
	
	const [showPassword, setShowPassword] = useState(false);

	return (
		<FormControl className="password mt-2 px-sm-2" error={isRquerid[typeName]}>
			<InputLabel
				color={isRquerid[typeName] ? "primary" : "secondary"}
				htmlFor="standard-adornment-password"
			>{text}</InputLabel>

			<Input
				color="secondary"
				type={showPassword ? 'text' : 'password'}
				onChange={handleChange}
				name={typeName}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={() => setShowPassword(!showPassword )}
							onMouseDown={e => e.preventDefault()}
						>
							{showPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
	)
}

export default InputPasswordPage;