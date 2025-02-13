import Axios from 'axios';
import type { LatLngTuple } from 'leaflet';
import type { Dispatch, SetStateAction } from 'react';
import type { TWeather } from '../types';

const VITE_BACK_URL = import.meta.env.VITE_BACK_URL;

export const getWeatherData = (
	latLng: LatLngTuple,
	setWeatherData: Dispatch<SetStateAction<TWeather>>
) => {
	Axios.get<TWeather>(`${VITE_BACK_URL}/weather`, {
		params: {
			lat: latLng[0],
			lon: latLng[1],
		},
	})
		.then((res) => {
			setWeatherData(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
};

export const handleCitySelection = (
	latLng: LatLngTuple,
	setCoordinates: Dispatch<SetStateAction<LatLngTuple>>,
	setWeatherData: Dispatch<SetStateAction<TWeather>>
): void => {
	setCoordinates(latLng);
	getWeatherData(latLng, setWeatherData);
};
