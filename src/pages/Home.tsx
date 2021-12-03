import useSWR from 'swr';
import { Box, Zoom } from '@mui/material';
import { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import WeatherCard from '../components/WeatherCard';
import { fetcher } from '../utils/fetcher';
import { CurrentWeatherType } from '../models/weather';
import useCurrentPosition from '../hooks/useCurrentPosition';
import { useSnackbar } from '../hooks/useSnackbarContext';
import Searchbar from '../components/Searchbar';

const Home = () => {
	const { showSnackbar } = useSnackbar();
	const { position } = useCurrentPosition();
	const navigate = useNavigate();
	const { paramLocation } = useParams();

	const handleError = useCallback((text: string) => {
		showSnackbar({ text, variant: 'error' });
	}, []);

	const { data } = useSWR<CurrentWeatherType>(
		paramLocation
			? `current.json?key=${process.env.REACT_APP_API_KEY}&q=${paramLocation}&aqi=no`
			: null,
		fetcher,
		{
			shouldRetryOnError: false,
			revalidateOnFocus: false,
			onError: () => handleError('Cannot fetch data for selected location')
		}
	);

	const search = (input: string, isfromGps?: boolean) => {
		if (isfromGps) {
			if (position.latitude !== 0 && position.longitude !== 0) {
				navigate(`/${position.latitude},${position.longitude}`);
			} else {
				handleError('Cannot fetch GPS data, try again');
			}
		} else {
			navigate(`/${input}`);
		}
	};

	const close = () => {
		navigate('/');
	};

	return (
		<Zoom in style={{ transitionDuration: '400ms' }}>
			<Box
				maxWidth="sm"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					alignSelf: 'center',
					width: '100%'
				}}
			>
				<Searchbar onSearch={search} onClose={close} />
				{data && <WeatherCard data={data} />}
			</Box>
		</Zoom>
	);
};

export default Home;
