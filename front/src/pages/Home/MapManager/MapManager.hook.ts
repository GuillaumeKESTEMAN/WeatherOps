import { useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';
import { useAppContext } from '../../../shared/AppContext/AppContext.hook';

export const useMapManager = () => {
	const { handleCitySelection, coordinates } = useAppContext();

	const map = useMapEvents({
		click(e) {
			handleCitySelection([e.latlng.lat, e.latlng.lng]);
		},
	});

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					handleCitySelection([latitude, longitude]);
				},
				null,
				{
					enableHighAccuracy: true,
					timeout: 5000,
				}
			);
		} else {
			console.log('Geolocation is not supported by this browser.');
		}
	}, [handleCitySelection]);

	useEffect(() => {
		map.flyTo(coordinates, 13);
	}, [coordinates, map]);
};
