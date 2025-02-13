import Axios from 'axios';
import {
	AutoComplete,
	type AutoCompleteSelectEvent,
} from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { useAppContext } from '../../../../shared/AppContext/AppContext.hook';

import type { TCity } from '../../../../shared/types';
import './MapPanelHeader.css';

const VITE_BACK_URL = import.meta.env.VITE_BACK_URL;

type TMapPanelHeader = {
	isPanelCollapsed: boolean;
	setIsPanelCollapsed: Dispatch<SetStateAction<boolean>>;
};

export const MapPanelHeader = ({
	isPanelCollapsed,
	setIsPanelCollapsed,
}: TMapPanelHeader) => {
	const { weatherData, handleCitySelection } = useAppContext();
	const [searchInput, setSearchInput] = useState('');
	const [suggestions, setSuggestions] = useState<TCity[]>([]);

	const search = () => {
		if (searchInput.length < 3) {
			return;
		}

		Axios.get<TCity[]>(`${VITE_BACK_URL}/city`, {
			params: {
				search: searchInput,
			},
		})
			.then((res) => {
				setSuggestions(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleOnSelect = (event: AutoCompleteSelectEvent) => {
		handleCitySelection([event.value.lat, event.value.lon]);
		setIsPanelCollapsed(false);
	};

	useEffect(() => {
		if (weatherData.city) {
			setIsPanelCollapsed(false);
			setSearchInput(weatherData.city);
		}
	}, [setIsPanelCollapsed, weatherData.city]);

	return (
		<div
			className="map-panel-header flex items-center justify-between"
			style={{
				width: '100%',
				backgroundColor: '#f0f0f0',
			}}
		>
			<FloatLabel className="w-11">
				<AutoComplete
					field="label"
					value={searchInput}
					suggestions={suggestions}
					completeMethod={search}
					onChange={(event) => setSearchInput(event.value)}
					onSelect={handleOnSelect}
					className="search-input m-2 w-12"
				/>
				<label htmlFor="search" className="ml-2">
					Rechercher une ville
				</label>
			</FloatLabel>
			<Button
				icon={`pi pi-chevron-${isPanelCollapsed ? 'down' : 'up'}`}
				onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
				className="m-2 p-button-text black-icon"
			/>
		</div>
	);
};
