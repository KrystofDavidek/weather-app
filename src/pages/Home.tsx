import useSWR from 'swr';
import { TextField, Box, IconButton, Typography } from '@mui/material';
import {
	SearchOutlined,
	CloseOutlined,
	LocationSearching
} from '@mui/icons-material';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import WeatherCard from '../components/WeatherCard';
import { fetcher } from '../utils/fetcher';
import { CurrentWeatherType } from '../models/weather';
import useCurrentPosition from '../hooks/useCurrentPosition';

const Home = () => {
	const [input, setInput] = useState<string>('');
	const [gpsError, setGpsError] = useState<boolean>(false);
	const { position } = useCurrentPosition();
	const navigate = useNavigate();
	const { paramLocation } = useParams();

	const { data } = useSWR<CurrentWeatherType>(
		paramLocation
			? `current.json?key=${process.env.REACT_APP_API_KEY}&q=${paramLocation}&aqi=no`
			: null,
		fetcher,
		{ shouldRetryOnError: false, revalidateOnFocus: false }
	);

	const search = (isfromGps?: boolean) => {
		setGpsError(false);
		if (isfromGps) {
			if (position.latitude !== 0 && position.longitude !== 0) {
				navigate(`${position.latitude},${position.longitude}`);
			} else {
				setGpsError(true);
			}
		} else {
			navigate(`/${input}`);
		}
	};

	const close = () => {
		setInput('');
		navigate('/');
	};

	const handleKeyDown = (event: { key: string }) => {
		if (event.key === 'Enter') {
			search();
		}
	};

	return (
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
			{gpsError && (
				<Typography color="red" mb={2}>
					Problem with location, click on location icon again.
				</Typography>
			)}

			<TextField
				sx={{ width: '70%', mb: '3rem' }}
				id="outlined-helperText"
				label="City"
				helperText="search by city name"
				value={input}
				onChange={e => {
					setInput(e.target.value);
				}}
				onKeyDown={handleKeyDown}
				InputProps={{
					startAdornment: (
						<IconButton onClick={() => search(true)}>
							<LocationSearching />
						</IconButton>
					),
					endAdornment: (
						<Box
							sx={{
								display: 'flex'
							}}
						>
							<IconButton onClick={() => search()}>
								<SearchOutlined />
							</IconButton>
							<IconButton onClick={close}>
								<CloseOutlined />
							</IconButton>
						</Box>
					)
				}}
			/>
			{data && <WeatherCard data={data} />}
		</Box>
	);
};

export default Home;
