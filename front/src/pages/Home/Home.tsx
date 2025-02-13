import { MapContainer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import { useAppContext } from '../../shared/AppContext/AppContext.hook';
import './Home.css';
import { MapManager } from './MapManager/MapManager';
import { MapPanel } from './MapPanel/MapPanel';

export const Home = () => {
	const { coordinates } = useAppContext();

	return (
		<div className="map relative">
			<MapPanel />
			<MapContainer
				center={coordinates}
				zoom={13}
				scrollWheelZoom
				style={{ height: '100%', width: '100%' }}
				className="z-0 map-container"
			>
				<MapManager />
			</MapContainer>
		</div>
	);
};
