export type TWeather = {
	city: string | null;
	temp: number | null;
	feltTemp: number | null;
	humidity: number | null;
	windSpeed: number | null;
	clouds: number | null;
};

export type TCity = {
	id: string;
	label: string;
	lat: string;
	lon: string;
};
