import {
	Card,
	CardContent,
	Typography,
	Button,
	CardMedia,
	Grid
} from '@mui/material';
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

import { CurrentWeatherType } from '../models/weather';

type WeatherProps = {
	data: CurrentWeatherType;
};

const WeatherCard: FC<WeatherProps> = ({ data }) => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate(`/${data.location.name}`);
	}, []);

	return (
		<Card sx={{ width: '100%', p: '1rem', boxShadow: 3 }}>
			<CardContent>
				<Grid container>
					<Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
						<Typography variant="h3" component="h1" sx={{ mr: '1rem' }}>
							{data.location.name}
						</Typography>
						<Typography component="span" color="grey">
							{data.location.localtime}
						</Typography>
					</Grid>

					<Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
						<Typography variant="h2" component="span" sx={{ my: '1rem' }}>
							{data.current.temp_c}°
						</Typography>
						<Typography variant="h6" component="span" sx={{ mb: '1rem' }}>
							Feels like {data.current.feelslike_c}°
						</Typography>
						<Typography variant="h6" component="span">
							Humidity {data.current.humidity} %
						</Typography>
						<Typography variant="h6" component="span">
							Wind direction is {data.current.wind_dir}
						</Typography>
						<Typography variant="h6" component="span">
							{data.current.wind_kph} kph
						</Typography>
						<Button
							component={Link}
							sx={{ width: '70%', mt: '2rem' }}
							variant="outlined"
							to={`/forecast/${data.location.name}`}
						>
							Show forecast
						</Button>
					</Grid>

					<Grid
						item
						xs={6}
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<CardMedia
							component="img"
							sx={{ width: '70%' }}
							image={data.current.condition.icon}
							alt="Condition icon"
						/>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default WeatherCard;
