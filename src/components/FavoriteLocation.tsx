import { useCallback, useState } from 'react';
import useSWR from 'swr';
import {
	Box,
	CircularProgress,
	Paper,
	Grid,
	Typography,
	Collapse,
	Grow,
	IconButton,
	Divider
} from '@mui/material';
import {
	DragIndicator,
	Delete,
	ExpandMore,
	ExpandLess,
	Place
} from '@mui/icons-material';

import { fetcher } from '../utils/fetcher';
import { CurrentWeatherType } from '../models/weather';

import { WeatherInfo } from './WeatherInfo/WeatherInfo';

type Props = {
	location: string;
};

export const FavoriteLocation = ({ location }: Props) => {
	const [open, setOpen] = useState(false);
	const { data } = useSWR<CurrentWeatherType>(
		location
			? `current.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&aqi=no`
			: null,
		fetcher,
		{ shouldRetryOnError: false, revalidateOnFocus: false }
	);

	const toggleMenu = useCallback(() => setOpen(previous => !previous), []);

	if (!data) {
		return <CircularProgress />;
	}

	return (
		<Paper elevation={0} variant="outlined">
			<Grid
				container
				alignItems="center"
				sx={{
					px: 1,
					py: 0.5
				}}
			>
				<Grid
					item
					xs="auto"
					sx={{ mr: 1, display: 'grid', placeItems: 'center', color: 'gray' }}
				>
					<DragIndicator />
				</Grid>
				<Grid item xs="auto">
					<Typography sx={{ fontWeight: 500 }}>{data.location.name}</Typography>
				</Grid>
				<Grid item xs>
					<Grow in={!open}>
						<Grid
							container
							alignItems="center"
							justifyContent="center"
							sx={{ color: 'gray' }}
						>
							<Grid
								item
								sx={{
									mr: 1,
									display: 'grid',
									placeItems: 'center'
								}}
							>
								<Place />
							</Grid>
							<Grid item>
								{data.location.country}, {data.location.region}
							</Grid>
						</Grid>
					</Grow>
				</Grid>
				<Grid item xs="auto">
					<IconButton onClick={toggleMenu}>
						{open ? <ExpandLess /> : <ExpandMore />}
					</IconButton>
				</Grid>
				<Grid item xs="auto">
					<IconButton
						onClick={() => {
							console.log('clicked');
						}}
					>
						<Delete />
					</IconButton>
				</Grid>
			</Grid>
			<Collapse in={open}>
				<Divider />
				<Box sx={{ p: 2 }}>
					<WeatherInfo data={data} />
				</Box>
			</Collapse>
		</Paper>
	);
};
