import { useState, useMemo } from 'react';
import {
	Typography,
	Box,
	Grid,
	LinearProgress,
	Select,
	MenuItem,
	SelectChangeEvent,
	FormControl,
	InputLabel
} from '@mui/material';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { format, addDays } from 'date-fns';

import ForecastCard from '../components/ForecastCard';
import { ForecastType } from '../models/forecast';
import { fetcher } from '../utils/fetcher';
import { Option } from '../types/select';

type DayOptionValues = 'today' | 'tomorrow' | 'twoDaysLater';

const dayOptions: Option<DayOptionValues>[] = [
	{
		value: 'today',
		label: 'Today'
	},
	{
		value: 'tomorrow',
		label: 'Tomorrow'
	},
	{
		value: 'twoDaysLater',
		label: format(new Date(), 'cccc')
	}
];

const resolveDate = (day: DayOptionValues): string => {
	const offset = day === 'twoDaysLater' ? 2 : day === 'tomorrow' ? 1 : 0;
	return format(addDays(new Date(), offset), 'yyyy-MM-dd');
};

const Forecast = () => {
	const { query } = useParams();
	const [day, setDay] = useState<DayOptionValues>('today');
	const date = useMemo(() => resolveDate(day), [day]);
	const { data, error } = useSWR<ForecastType, unknown>(
		`forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${query}&dt=${date}`,
		fetcher,
		{ shouldRetryOnError: false, revalidateOnFocus: false }
	);

	if (error) {
		return <Typography align="center">Something went wrong...</Typography>;
	}

	if (!data) {
		return <LinearProgress />;
	}

	const handleChange = (event: SelectChangeEvent<DayOptionValues>) => {
		event.preventDefault();
		setDay(event.target.value as DayOptionValues);
	};

	return (
		<Box sx={{ my: '2rem' }}>
			<Grid container alignItems="center" gap={1}>
				<Grid item>
					<Typography
						variant="h1"
						sx={{ fontSize: 42, fontWeight: 500 }}
						color="GrayText"
					>
						Hourly forecast
					</Typography>
				</Grid>
				<Grid
					item
					container
					alignItems="center"
					gap={2}
					justifyContent="space-between"
				>
					<Grid item>
						<Typography sx={{ fontSize: 26 }}>Brno</Typography>
					</Grid>
					<Grid item>
						<FormControl>
							<InputLabel id="forecast-day">Day</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={day}
								label="Day"
								onChange={handleChange}
							>
								{dayOptions.map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</Grid>
			{data.forecast.forecastday[0]?.hour.map(data => (
				<ForecastCard key={data.time_epoch} data={data} />
			))}
		</Box>
	);
};

export default Forecast;
