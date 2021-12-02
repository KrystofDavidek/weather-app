import { Grid, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { FavoriteLocation } from '../components/FavoriteLocation';
import PageTitle from '../components/PageTitle';
import useUserContext from '../hooks/useUserContext';

const MyLocations = () => {
	const { userData } = useUserContext();

	const hasLocations = userData?.locations.length !== 0;

	return (
		<div>
			<Grid container direction="column" gap={4}>
				<Grid item>
					<PageTitle title="My locations" />
				</Grid>
				{hasLocations ? (
					userData?.locations.map(location => (
						<Grid item xs={12} lg={6} key={location}>
							<FavoriteLocation location={location} />
						</Grid>
					))
				) : (
					<Grid item alignSelf="center">
						<Typography textAlign="center">
							You have no favorite locations
						</Typography>
						<Typography textAlign="center">
							Search for the locations{' '}
							<NavLink to="/">
								<Typography component="span" sx={{ fontWeight: 500 }}>
									here
								</Typography>
							</NavLink>{' '}
							and add them to your favorite list
						</Typography>
					</Grid>
				)}
			</Grid>
		</div>
	);
};

export default MyLocations;
