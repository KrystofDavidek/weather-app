import { FormControl, TextField, Typography } from '@mui/material';
import { ChangeEvent } from 'react';

type Props = {
	current: string | undefined;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const UsernameSetter = ({ current, value, onChange }: Props) => {
	const currentNickname = current ? `Currently: ${current}` : 'No nickname yet';

	return (
		<FormControl sx={{ justifyContent: 'center', alignItems: 'center' }}>
			<Typography
				variant="subtitle1"
				color="primary.main"
				fontWeight="600"
				sx={{ mb: 2 }}
			>
				Set a nickname
			</Typography>

			<TextField
				id="username"
				name="userName"
				value={value}
				onChange={onChange}
				helperText={currentNickname}
				type="text"
			/>
		</FormControl>
	);
};

export default UsernameSetter;
