import {
	Box,
	Card,
	CardContent,
	Typography,
	Button,
	CardMedia,
	Grid,
	IconButton,
	Divider,
	Tooltip,
	Zoom
} from '@mui/material';
import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { StarOutline, Star, DragIndicator } from '@mui/icons-material';
import { arrayUnion, arrayRemove, updateDoc } from 'firebase/firestore';
import { grey } from '@mui/material/colors';

import useUserContext from '../hooks/useUserContext';
import { userDataDocument } from '../utils/firebase';
import { CurrentWeatherType } from '../models/weather';
import { useUnits } from '../hooks/useUnits';

import LabeledItem from './LabeledItem';

type WeatherProps = {
	data: CurrentWeatherType;
};

const WeatherCard: FC<WeatherProps> = ({ data }) => {
	const { user, userData } = useUserContext();
	const { temp, wind, feelslike } = useUnits();
	const activeStar = useMemo(
		() => userData?.locations.includes(data.location.name),
		[userData, data.location.name]
	);

	const datetime = new Date(data.location.localtime_epoch * 1000)
		.toString()
		.substring(0, 24);

	const handleClick = async () => {
		if (!user?.email) {
			return;
		}
		const action = activeStar ? arrayRemove : arrayUnion;
		await updateDoc(userDataDocument(user.email), {
			locations: action(data.location.name)
		});
	};

	return (
		<Zoom in style={{ transitionDuration: '600ms' }}>
			<Card
				variant="outlined"
				sx={{
					width: '100%',
					p: '1rem',
					pt: 0,
					borderColor: 'primary.main',
					borderWidth: 2
				}}
			>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
					<Box sx={{ display: 'grid', placeItems: 'center' }}>
						<DragIndicator sx={{ color: 'primary.main', cursor: 'pointer' }} />
					</Box>
					{user && (
						<Tooltip
							title={activeStar ? 'Remove from favorites' : 'Add to favorites'}
						>
							<IconButton onClick={handleClick}>
								{activeStar ? (
									<Star sx={{ color: 'primary.main' }} />
								) : (
									<StarOutline sx={{ color: 'primary.main' }} />
								)}
							</IconButton>
						</Tooltip>
					)}
				</Box>
				<Divider />
				<CardContent>
					<Grid container>
						<Grid
							item
							xs={12}
							sx={{
								display: 'flex',
								alignItems: 'self-end',
								justifyContent: 'space-between'
							}}
						>
							<Typography
								variant="h3"
								component="h1"
								sx={{
									mr: '1rem',
									fontSize: 42,
									fontWeight: 600,
									color: 'primary.main'
								}}
							>
								{data.location.name}
							</Typography>
							<Typography
								variant="subtitle1"
								component="span"
								sx={{ fontSize: 22, mr: '1rem', color: grey[600] }}
							>
								{datetime}
							</Typography>
						</Grid>

						<Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
							<Typography variant="h3" component="span" sx={{ my: '0.5rem' }}>
								{data.current[temp.key]}
								{temp.unit}
							</Typography>
							<LabeledItem
								label="Feels like"
								content={`${data.current[feelslike.key]}${feelslike.unit}`}
							/>
							<LabeledItem
								label="Humidity"
								content={`${data.current.humidity} %`}
							/>
							<LabeledItem
								label="Wind direction"
								content={`${data.current.wind_dir}`}
							/>
							<LabeledItem
								label="Wind speed"
								content={`${data.current[wind.key]} ${wind.unit}`}
							/>
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
								sx={{ width: '50%' }}
								image={data.current.condition.icon}
								alt="Condition icon"
							/>
						</Grid>
						<div
							style={{
								width: '100%',
								alignSelf: 'center',
								alignContent: 'center'
							}}
						>
							<Button
								component={Link}
								sx={{
									width: '100%',
									mt: '2rem',
									color: 'white',
									background:
										'linear-gradient(to right, #096DD7, #5779EC, #8F84F8)'
								}}
								variant="outlined"
								to={`/forecast/${data.location.name}`}
							>
								Show forecast
							</Button>
						</div>
					</Grid>
				</CardContent>
			</Card>
		</Zoom>
	);
};

export default WeatherCard;
