import { Button, Card, Divider, Grid } from '@mui/material';

import PageTitle from '../components/PageTitle';
import SpeedUnit from '../components/SpeedUnit';
import TemperatureUnit from '../components/TemperatureUnit';
import UsernameSetter from '../components/UsernameSetter';
import useUserContext from '../hooks/useUserContext';

const Settings = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { user, userData } = useUserContext();

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

					<UsernameSetter />
					<TemperatureUnit />
					<SpeedUnit />

					<Divider style={{ color: 'primary.main' }} variant="middle" />
					<Button
						variant="contained"
						// onClick={toggleLogin}
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
