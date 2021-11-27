export type CurrentWeatherData = {
	name: string;
	country: string;
	localtime: string;
	temp_c: number;
	temp_f: number;
	feelslike_c: number;
	feelslike_f: number;
	humidity: number;
	is_day: boolean;
	condition: {
		text: string;
		icon: string;
	};
	wind_dir: string;
};
