import { FormControl, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const UsernameSetter = () => {
	const [username, setUsername] = useState<string>('');

	return (
		<FormControl
			component="fieldset"
			sx={{ justifyContent: 'center', alignItems: 'center' }}
		>
			<Typography variant="subtitle1" color="primary.main" fontWeight="600">
				Set a nickname
			</Typography>

			<TextField
				label="Nickname"
				id="username"
				value={username}
				onChange={e => setUsername(e.target.value)}
				type="email"
			/>
		</FormControl>
	);
};

export default UsernameSetter;
