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
    map.flyTo(coordinates, 13); 
  }, [coordinates, map]);
};
