import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography
} from '@mui/material';
import { ChangeEvent, useState } from 'react';

type Props = {
	current: 'celsius' | 'fahrenheit' | undefined;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TemperatureUnit = ({ current, onChange }: Props) => {
	const [selected, setSelected] = useState(current);

	const isSelected = (value: string) => {
		if (selected === value) {
			return true;
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = (e: any) => {
		setSelected(e.target.value);
		onChange(e);
	};
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
				name="degreesUnit"
				value={selected}
				onChange={onChange}
			>
				<FormControlLabel
					value="celsius"
					control={<Radio sx={{ color: 'primary.main' }} />}
					label="Celsius"
					checked={isSelected('celsius')}
					onChange={handleChange}
				/>
				<FormControlLabel
					value="fahrenheit"
					control={<Radio sx={{ color: 'primary.main' }} />}
					label="Fahrenheit"
					checked={isSelected('fahrenheit')}
					onChange={handleChange}
				/>
			</RadioGroup>
		</FormControl>
	);
};

export default TemperatureUnit;
