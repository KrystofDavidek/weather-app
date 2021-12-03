import { FormControl, TextField, Typography } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';

type Props = {
	current: string | undefined;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const UsernameSetter = ({ current, onChange }: Props) => {
	const [username, setUsername] = useState(current);

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
				value={username}
				onChange={useCallback((e: ChangeEvent<HTMLInputElement>) => {
					e.preventDefault();
					setUsername(e.target.value);
					onChange(e);
				}, [])}
				helperText={currentNickname}
				type="text"
			/>
		</FormControl>
	);
};

export default UsernameSetter;
