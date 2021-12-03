import { Grid } from '@mui/material';

import FavoriteLocationCard from '../components/FavoriteLocationCard';
import PageTitle from '../components/PageTitle';
import useUserContext from '../hooks/useUserContext';

const MyLocations = () => {
	const { userData } = useUserContext();

	return (
		<div>
			<Grid container direction="column" gap={4}>
				<Grid item sx={{ alignSelf: 'center' }}>
					<PageTitle title="EXAMPLE" />
				</Grid>
				<Grid item container gap={2} justifyContent="space-evenly">
					{userData?.locations.map(location => (
						<Grid item xs={12} lg={6} key={location}>
							<FavoriteLocationCard location={location} />
						</Grid>
					))}
				</Grid>
			</Grid>
		</div>
	);
};

export default MyLocations;
