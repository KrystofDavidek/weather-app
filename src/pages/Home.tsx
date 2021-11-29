import useSWR from 'swr';
import { TextField, Box, IconButton } from '@mui/material';
import { SearchOutlined, CloseOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

import WeatherCard from '../components/WeatherCard';
import { fetcher } from '../utils/fetcher';
import { CurrentWeatherType } from '../models/weather';

const Home = () => {
	const [input, setInput] = useState<string>('');
	const [location, setLocation] = useState<string>('');
	const navigate = useNavigate();
	const { paramLocation } = useParams();

	const { data } = useSWR<CurrentWeatherType>(
		`current.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&aqi=no`,
		fetcher,
		{ shouldRetryOnError: false, revalidateOnFocus: false }
	);

	const search = () => {
		setLocation(input);
	};

	const close = () => {
		setInput('');
		setLocation('');
		navigate('/');
	};

	useEffect(() => {
		if (paramLocation) {
			setInput(paramLocation);
			setLocation(paramLocation);
		}
	}, [paramLocation]);

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
						<IconButton onClick={search}>
							<SearchOutlined />
						</IconButton>
					),
					endAdornment: (
						<IconButton onClick={close}>
							<CloseOutlined />
						</IconButton>
					)
				}}
			/>
			{data && <WeatherCard data={data} />}
		</Box>
	);
};

export default Home;
