import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { useAppContext } from '../../../shared/AppContext/AppContext.hook';
import { MapPanelHeader } from './MapPanelHeader/MapPanelHeader';

import './MapPanel.css';

export const MapPanel = () => {
	const { weatherData } = useAppContext();
	const [isPanelCollapsed, setIsPanelCollapsed] = useState(true);
	const [isFavoriteCity, setIsFavoriteCity] = useState(false);

	return (
		<Panel
			headerTemplate={
				<MapPanelHeader
					isPanelCollapsed={isPanelCollapsed}
					setIsPanelCollapsed={setIsPanelCollapsed}
				/>
			}
			className="map-panel p-shadow-2"
			toggleable
			collapsed={isPanelCollapsed}
			onToggle={(e) => setIsPanelCollapsed(e.value)}
		>
			{weatherData ? (
				<div className="weather-data p-grid p-nogutter">
					<div className='flex flex-row justify-content-around align-items-center'>
						<h3>{weatherData.city}</h3>

						<Button
							icon={isFavoriteCity ? 'pi pi-heart-fill' : 'pi pi-heart'}
							style={{ color: 'orange' }}
							onClick={() => setIsFavoriteCity(!isFavoriteCity)}
							tooltip={isFavoriteCity ? 'Ville ajoutée aux favoris !' : 'Ville retirée des favoris !'}
							tooltipOptions={{ event: 'focus' }}
							className='p-button-rounded p-button-text border border-1 border-solid border-orange-500'
						/>
					</div>
					<div className='flex flex-row align-items-center'>
						<div className='flex flex-column'>
							{weatherData.icon &&
								<img
									src={weatherData.icon}
								/>
							}
						</div>

						<div className='flex flex-column ml-5'>
							<span className='font-bold'>{weatherData.temp}°C</span>

							<span className='mt-0'>
								{weatherData.description}
							</span>
						</div>
					</div>
					<p>
						<strong>Humidité:</strong> {weatherData.humidity}%
					</p>
					<p>
						<strong>Vitesse du vent:</strong>{' '}
						{weatherData.windSpeed} km/h
					</p>
					<p>
						<strong>Couverture nuageuse:</strong>{' '}
						{weatherData.clouds}%
					</p>
				</div>
			) : (
				'Alternative Content'
			)}
		</Panel>
	);
};
