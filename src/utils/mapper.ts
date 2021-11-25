import { CurrentWeatherData } from './../models/weather';

export const toCurrentWeatherData = (data: any): CurrentWeatherData => ({
	name: data.location.name,
	country: data.location.country,
	localtime: data.location.localtime,
	temp_c: data.current.temp_c,
	temp_f: data.current.temp_f,
	feelslike_c: data.current.feelslike_c,
	feelslike_f: data.current.feelslike_f,
	humidity: data.current.humidity,
	is_day: data.current.is_day,
	condition: {
		text: data.current.condition.text,
		icon: data.current.condition.icon
	},
	wind_dir: data.current.wind_dir
});
