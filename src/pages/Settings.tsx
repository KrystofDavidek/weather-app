import { Button, Card, Divider, Grid } from '@mui/material';
import { updateDoc } from 'firebase/firestore';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import PageTitle from '../components/PageTitle';
import SpeedUnit from '../components/SpeedUnit';
import TemperatureUnit from '../components/TemperatureUnit';
import UsernameSetter from '../components/UsernameSetter';
import { useSnackbar } from '../hooks/useSnackbarContext';
import useUserContext from '../hooks/useUserContext';
import { userDataDocument } from '../utils/firebase';

const Settings = () => {
	const { user, userData } = useUserContext();
	const [state, setState] = useState({
		userName: userData?.userName,
		degreesUnit: userData?.degreesUnit,
		speedUnit: userData?.speedUnit
	});
	const { showSnackbar } = useSnackbar();

	const handleError = useCallback((text: string) => {
		showSnackbar({ text, variant: 'error' });
	}, []);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log('settings handle change');
		console.log(e);
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!user?.email) {
			return;
		}
		try {
			await updateDoc(userDataDocument(user.email), {
				userName: state.userName,
				degreesUnit: state.degreesUnit,
				speedUnit: state.speedUnit
			});
			showSnackbar({ text: 'Successfully updated', variant: 'success' });
		} catch (error) {
			handleError((error as { message?: string })?.message ?? 'Unknown error');
		}
	};

	return (
		<Grid
			container
			direction="column"
			alignItems="center"
			justifyContent="center"
			sx={{ minHeight: '50vh' }}
		>
			<Grid item sx={{ minWidth: '40vh' }}>
				<Card
					component="form"
					variant="outlined"
					sx={{
						display: 'flex',
						borderColor: 'primary.main',
						borderWidth: 2,
						flexDirection: 'column',
						width: '100%',
						p: 4,
						gap: 4
					}}
				>
					<div style={{ alignSelf: 'center' }}>
						<PageTitle title="Settings" />
					</div>
					<Divider style={{ color: 'primary.main' }} variant="middle" />

					<UsernameSetter
						current={userData?.userName}
						onChange={handleChange}
					/>
					<TemperatureUnit
						current={userData?.degreesUnit}
						onChange={handleChange}
					/>
					<SpeedUnit current={userData?.speedUnit} onChange={handleChange} />

					<Divider style={{ color: 'primary.main' }} variant="middle" />
					<Button
						variant="contained"
						onClick={handleSubmit}
						sx={{
							width: '20%',
							alignSelf: 'center',
							background: 'linear-gradient(to right, #096DD7, #5779EC, #8F84F8)'
						}}
					>
						Save
					</Button>
				</Card>
			</Grid>
		</Grid>
	);
};

export default Settings;
