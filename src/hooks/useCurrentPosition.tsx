import { useEffect, useState } from 'react';

export type GeoPosition = {
	latitude: number;
	longitude: number;
};

const useCurrentPosition = () => {
	const [position, setPosition] = useState<GeoPosition>({
		latitude: 0,
		longitude: 0
	});
	const [error, setError] = useState('');

	const onChange = (geo: GeolocationPosition) => {
		setPosition({
			latitude: geo.coords.latitude,
			longitude: geo.coords.longitude
		});
	};

	const onError = (error: GeolocationPositionError) => {
		setError(error.message);
	};

	// Handler enables the app to update the coords continually
	useEffect(() => {
		const geo = navigator.geolocation;
		if (!geo) {
			setError('Geolocation is not supported');
			return;
		}
		const handler = geo.watchPosition(onChange, onError);
		return () => geo.clearWatch(handler);
	}, []);

	return { position, error };
};

export default useCurrentPosition;
