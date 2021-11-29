import {
	Card,
	CardContent,
	Typography,
	Button,
	CardMedia,
	Grid
} from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { CurrentWeatherData } from '../models/weather';

type WeatherProps = {
	data: CurrentWeatherData;
};

const WeatherCard: FC<WeatherProps> = ({ data }) => (
	<Card sx={{ width: '100%', p: '1rem', boxShadow: 3 }}>
		<CardContent>
			<Grid container>
				<Grid xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
					<Typography variant="h3" component="h1" sx={{ mr: '1rem' }}>
						{data.name}
					</Typography>
					<Typography component="span" color="grey">
						{data.localtime}
					</Typography>
				</Grid>

				<Grid xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
					<Typography variant="h2" component="span" sx={{ my: '1rem' }}>
						{data.temp_c}°
					</Typography>
					<Typography variant="h6" component="span" sx={{ mb: '1rem' }}>
						Feels like {data.feelslike_c}°
					</Typography>
					<Typography variant="h6" component="span">
						Humidity {data.humidity} %
					</Typography>
					<Typography variant="h6" component="span">
						Wind direction is {data.wind_dir}
					</Typography>
					<Button
						component={Link}
						sx={{ width: '70%', mt: '2rem' }}
						variant="outlined"
						to={`/forecast/${data.name}`}
					>
						Show forecast
					</Button>
				</Grid>

				<Grid
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
						image={data.condition.icon}
						alt="Condition icon"
					/>
				</Grid>
			</Grid>
		</CardContent>
	</Card>
);

export default WeatherCard;
