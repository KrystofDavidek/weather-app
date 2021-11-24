import useSWR from 'swr';
import { TextField, Box, IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';

import WeatherCard from '../components/WeatherCard';
import { fetcher } from '../utils/fetcher';

const Home = () => {
	const [input, setInput] = useState<string>('');
	const [location, setLocation] = useState<string>('');
	const [shouldFetch, setShouldFetch] = useState<boolean>(false);

	const { data, error } = useSWR(
		shouldFetch
			? `current.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&aqi=no`
			: null,
		fetcher
	);

	const search = () => {
		setLocation(input);
		setShouldFetch(true);
	};

	useEffect(() => {
		if (error !== undefined) {
			setShouldFetch(false);
		}
	}, [error]);

	const handleKeyDown = (event: { key: string }) => {
		if (event.key === 'Enter') {
			search();
		}
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '80%'
			}}
		>
			<TextField
				sx={{ width: '70%', marginBottom: '3rem' }}
				id="outlined-helperText"
				label="City"
				helperText="search by city name"
				value={input}
				onChange={e => {
					setInput(e.target.value);
				}}
				onKeyDown={handleKeyDown}
				InputProps={{
					endAdornment: (
						<IconButton onClick={search}>
							<SearchOutlined />
						</IconButton>
					)
				}}
			/>
			{data && <WeatherCard data={data} />}
		</Box>
	);
};

export default Home;
