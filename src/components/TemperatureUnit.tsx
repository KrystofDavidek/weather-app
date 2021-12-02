import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography
} from '@mui/material';
import { useState } from 'react';

type DegreesUnit = 'celsius' | 'fahrenheit';

const TemperatureUnit = () => {
	const [value, setValue] = useState<DegreesUnit>('celsius');
	return (
		<FormControl
			component="fieldset"
			sx={{ justifyContent: 'center', alignItems: 'center' }}
		>
			<Typography variant="subtitle1" color="primary.main" fontWeight="600">
				Temperature Unit
			</Typography>

			<RadioGroup
				row
				aria-label="unit"
				name="controlled-radio-buttons-group"
				value={value}
				// onChange={handleChange}
			>
				<FormControlLabel
					value="celsius"
					control={<Radio sx={{ color: 'primary.main' }} />}
					label="Celsius"
				/>
				<FormControlLabel
					value="fahrenheit"
					control={<Radio sx={{ color: 'primary.main' }} />}
					label="Fahrenheit"
				/>
			</RadioGroup>
		</FormControl>
	);
};

export default TemperatureUnit;
