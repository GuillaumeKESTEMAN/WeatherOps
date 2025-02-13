import { Panel } from 'primereact/panel';
import { useState } from 'react';
import { useAppContext } from '../../../shared/AppContext/AppContext.hook';
import { MapPanelHeader } from './MapPanelHeader/MapPanelHeader';

import './MapPanel.css';

export const MapPanel = () => {
	const { weatherData } = useAppContext();
	const [isPanelCollapsed, setIsPanelCollapsed] = useState(true);

	return (
		<Panel
			headerTemplate={<MapPanelHeader isPanelCollapsed={isPanelCollapsed} setIsPanelCollapsed={setIsPanelCollapsed} />}
			className="map-panel absolute w-3 h-12 z-5"
			toggleable
			collapsed={isPanelCollapsed}
			onToggle={(e) => setIsPanelCollapsed(e.value)}
		>
			<p>{weatherData ? weatherData.temp : 'Alternative Content'}</p>
		</Panel>
	);
};
