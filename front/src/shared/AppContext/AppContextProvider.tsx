import type { LatLngTuple } from 'leaflet';
import { useEffect, useMemo, useState } from 'react';
import type { TWeather } from '../types';
import { AppContext } from './AppContext';
import { getWeatherData } from './AppContext.helpers';
import type { TAppContext, TAppContextProvider } from './types';

export const AppContextProvider = ({ children }: TAppContextProvider) => {
	const [coordinates, setCoordinates] = useState<LatLngTuple>([
		48.859, 2.347,
	]);
	const [weatherData, setWeatherData] = useState<TWeather>({
		city: null,
		temp: null,
		feltTemp: null,
		humidity: null,
		windSpeed: null,
		clouds: null,
	});

	const appContextValue = useMemo<TAppContext>(
		() => ({
			coordinates,
			weatherData,
			handleCitySelection: setCoordinates,
		}),
		[coordinates, weatherData]
	);

	useEffect(() => {
		getWeatherData(coordinates, setWeatherData);
	}, [coordinates]);

	return (
		<AppContext.Provider value={appContextValue}>
			{children}
		</AppContext.Provider>
	);
};
