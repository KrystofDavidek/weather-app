import { NavLink } from 'react-router-dom';
import { Box, Grid, Typography, Button } from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import CloudIcon from '@mui/icons-material/Cloud';
import NavigationIcon from '@mui/icons-material/Navigation';
import CompressIcon from '@mui/icons-material/Compress';

import { CurrentWeatherType } from '../../models/weather';
import { useUnits } from '../../hooks/useUnits';

import { WeatherInfoItem } from './WeatherInfoItem';

type Props = {
	data: CurrentWeatherType;
};

export const WeatherInfo = ({ data }: Props) => {
	const { temp, wind } = useUnits();
	const { location, current } = data;

	return (
		<Box>
			<Grid container alignItems="center">
				<Grid item xs sx={{ mt: 1, mb: 0.5 }}>
					<Typography sx={{ fontWeight: 500 }}>{location.country}</Typography>
					<Typography>{location.region}</Typography>
				</Grid>
				<Grid item>
					<Button component={NavLink} to={`/forecast/${location.name}`}>
						Show forecast
					</Button>
				</Grid>
			</Grid>
			<Grid container justifyContent="space-between" sx={{ mt: 3 }}>
				<Grid item xs={12} sm={5} md={4} lg={5}>
					<WeatherInfoItem
						Icon={<DeviceThermostatIcon color="primary" />}
						label="temperature"
						content={`${current[temp.key]}${temp.unit}`}
					/>
					<WeatherInfoItem
						Icon={<OpacityIcon color="primary" />}
						label="humidity"
						content={`${current.humidity}%`}
					/>
					<WeatherInfoItem
						Icon={<AirIcon color="primary" />}
						label="wind speed"
						content={`${current[wind.key]} ${wind.unit}`}
					/>
				</Grid>
				<Grid item xs={12} sm={5} md={4} lg={5}>
					<WeatherInfoItem
						Icon={<CloudIcon color="primary" />}
						label="cloud coverage"
						content={`${current.cloud}%`}
					/>
					<WeatherInfoItem
						Icon={
							<NavigationIcon
								color="primary"
								sx={{ transform: 'rotate(40deg)' }}
							/>
						}
						label="wind direction"
						content={`${current.wind_dir}`}
					/>
					<WeatherInfoItem
						Icon={<CompressIcon color="primary" />}
						label="pressure"
						content={`${current.pressure_mb} mb`}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};
