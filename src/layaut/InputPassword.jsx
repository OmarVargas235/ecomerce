import React, { useState } from 'react';

import { IconButton, FormControl, InputLabel, Input, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const InputPassword = ({ handleChange, isRequired, isCreateAccount=false, text, typeName }) => {

	const [showPassword, setShowPassword] = useState(false);

	return (
		<FormControl
			className={isCreateAccount ? 'password mt-2 px-sm-2' : 'mb-3'}
			error={isRequired[typeName]}
		>
			<InputLabel
				htmlFor="standard-adornment-password"
				color={isRequired.password ? "primary" : "secondary"}
			>{text} *</InputLabel>

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

export default InputPassword;