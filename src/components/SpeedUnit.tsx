import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography
} from '@mui/material';
import { useState } from 'react';

type SpeedUnit = 'kilometers' | 'miles';

const SpeedUnit = () => {
	const [value, setValue] = useState<SpeedUnit>('kilometers');
	return (
		<FormControl
			component="fieldset"
			sx={{ justifyContent: 'center', alignItems: 'center' }}
		>
			<Typography variant="subtitle1" color="primary.main" fontWeight="600">
				Speed Unit
			</Typography>

			<RadioGroup
				row
				aria-label="unit"
				name="controlled-radio-buttons-group"
				value={value}
				// onChange={handleChange}
			>
				<FormControlLabel
					value="kilometres"
					control={<Radio sx={{ color: 'primary.main' }} />}
					label="Kilometres"
				/>
				<FormControlLabel
					value="miles"
					control={<Radio sx={{ color: 'primary.main' }} />}
					label="Miles"
				/>
			</RadioGroup>
		</FormControl>
	);
};

export default SpeedUnit;
