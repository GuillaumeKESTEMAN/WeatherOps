import Axios from 'axios';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { useAppContext } from '../../../../shared/AppContext/AppContext.hook';

import './MapPanelHeader.css';

const VITE_BACK_URL = import.meta.env.VITE_BACK_URL;

type TMapPanelHeader = {
	isPanelCollapsed: boolean;
	setIsPanelCollapsed: Dispatch<SetStateAction<boolean>>;
};

export const MapPanelHeader = ({isPanelCollapsed, setIsPanelCollapsed}: TMapPanelHeader) => {
	const { handleCitySelection } = useAppContext();
	const [searchInput, setSearchInput] = useState('');
	const [suggestions, setSuggestions] = useState([]);

	const search = () => {
		if (searchInput.length >= 3) {
			Axios.get(`${VITE_BACK_URL}/city`, {
				params: {
					search: searchInput,
				},
			})
				.then((res) => {
					setSuggestions(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

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
					onChange={(e) => setSearchInput(e.value)}
					onSelect={(e) => {
						handleCitySelection([e.value.lat, e.value.lon]);
						setSearchInput('');
					}}
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
