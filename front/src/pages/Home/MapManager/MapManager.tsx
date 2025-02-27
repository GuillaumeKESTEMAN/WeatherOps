import { Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import { useAppContext } from '../../../shared/AppContext/AppContext.hook';
import '../Home.css';
import { useMapManager } from './MapManager.hook';

export const MapManager = () => {
	const { coordinates } = useAppContext();
	useMapManager();
	return (
		<>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={coordinates}>
				<Popup>
					You clicked here: <br /> Latitude: {coordinates[0]},
					Longitude: {coordinates[1]}
				</Popup>
			</Marker>
			<ZoomControl position="bottomright" />
		</>
	);
};
