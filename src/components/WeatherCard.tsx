import { Card } from '@mui/material';
import { FC } from 'react';

type WeatherProps = {
	data: any;
};

const WeatherCard: FC<WeatherProps> = ({ data }) => (
	<Card sx={{ width: '100%' }}>{JSON.stringify(data)}</Card>
);

export default WeatherCard;
