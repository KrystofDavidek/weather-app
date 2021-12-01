import useSWR from 'swr';
import { CircularProgress } from '@mui/material';

import WeatherCard from '../components/WeatherCard';
import { fetcher } from '../utils/fetcher';
import { CurrentWeatherType } from '../models/weather';

type Props = {
	location: string;
};

const FavoriteLocationCard = ({ location }: Props) => {
	const { data } = useSWR<CurrentWeatherType>(
		location
			? `current.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&aqi=no`
			: null,
		fetcher,
		{ shouldRetryOnError: false, revalidateOnFocus: false }
	);

	if (!data) {
		return <CircularProgress />;
	}

	return <WeatherCard data={data} />;
};

export default FavoriteLocationCard;
