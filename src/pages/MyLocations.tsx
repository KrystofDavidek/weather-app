import useSWR from 'swr';
import { Typography, CircularProgress } from '@mui/material';
import { useEffect } from 'react';

import { fetcher } from '../utils/fetcher';

const MyLocations = () => {
	const { data, error } = useSWR(
		`current.json?key=${process.env.REACT_APP_API_KEY}&q=Praha&aqi=no`,
		fetcher
	);

	useEffect(() => {
		console.log(data);
	}, [data]);

	if (error) return <Typography>Failed to load data...</Typography>;
	if (!data) return <CircularProgress />;

	return <div>My Locations</div>;
};

export default MyLocations;
