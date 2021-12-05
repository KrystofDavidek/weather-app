import useUserContext from './useUserContext';

type UnitType = {
	key:
		| 'temp_c'
		| 'temp_f'
		| 'wind_mph'
		| 'wind_kph'
		| 'feelslike_c'
		| 'feelslike_f';
	unit: string;
};

export const useUnits = () => {
	const { userData } = useUserContext();

	const temp: UnitType =
		userData?.degreesUnit === 'fahrenheit'
			? {
					key: 'temp_f',
					unit: '°F'
			  }
			: {
					key: 'temp_c',
					unit: '°C'
			  };

	const wind: UnitType =
		userData?.speedUnit === 'miles'
			? {
					key: 'wind_mph',
					unit: 'mph'
			  }
			: {
					key: 'wind_kph',
					unit: 'kmph'
			  };

	const feelslike: UnitType =
		userData?.degreesUnit === 'fahrenheit'
			? {
					key: 'feelslike_f',
					unit: '°F'
			  }
			: {
					key: 'feelslike_c',
					unit: '°C'
			  };

	return { temp, wind, feelslike };
};
