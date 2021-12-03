import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography
} from '@mui/material';
import { ChangeEvent, useState } from 'react';

type Props = {
	current: 'kilometers' | 'miles' | undefined;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SpeedUnit = ({ current, onChange }: Props) => {
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
				Speed Unit
			</Typography>

			<RadioGroup
				row
				aria-label="unit"
				name="speedUnit"
				value={selected}
				onChange={onChange}
			>
				<FormControlLabel
					value="kilometers"
					control={<Radio sx={{ color: 'primary.main' }} />}
					label="Kilometers"
					checked={isSelected('kilometres')}
					onChange={handleChange}
				/>
				<FormControlLabel
					value="miles"
					control={<Radio sx={{ color: 'primary.main' }} />}
					label="Miles"
					checked={isSelected('miles')}
					onChange={handleChange}
				/>
			</RadioGroup>
		</FormControl>
	);
};

export default SpeedUnit;
