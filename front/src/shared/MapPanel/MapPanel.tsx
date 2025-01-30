import React from 'react';
import { Panel, PanelHeaderTemplateOptions } from 'primereact/panel';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import Axios from 'axios';
import { LatLngTuple } from 'leaflet';
const VITE_BACK_URL = import.meta.env.VITE_BACK_URL;

interface ChildProps {
  onCitySelection: (value: LatLngTuple) => void;
}

export const MapPanel: React.FC<ChildProps> = ({ onCitySelection }) => {
  const [searchInput, setSearchInput] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);

  const search = () => {
    if (searchInput.length > 3) {
      Axios.get(`${VITE_BACK_URL}/city`, {
        params: {
          search: searchInput
        }
      })
      .then(res => {
        console.log(res.data);
        setSuggestions(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  const headerTemplate = (options: PanelHeaderTemplateOptions): React.ReactNode => {
    const toggleIcon = options.collapsed
      ? 'pi pi-chevron-down'
      : 'pi pi-chevron-up';

    return (
      <div
        className="flex items-center justify-between"
        style={{
          width: '100%',
          backgroundColor: '#f0f0f0',
         }}
      >
        <FloatLabel className='w-11'>

        <AutoComplete
          field='label'
          value={searchInput}
          suggestions={suggestions}
          completeMethod={search}
          onChange={(e) => setSearchInput(e.value)}
          onSelect={(e) => {
            setSelectedCity(e.value);
            onCitySelection([e.value.lat, e.value.lon]);
            setSearchInput('');
          }}
          className='m-2 w-12'
        />
          <label
            htmlFor="search"
            className='ml-2'
          >
            Search
          </label>
        </FloatLabel>

        <Button
          icon={toggleIcon}
          className='m-2'
        />
      </div>
    );
  };

  return (
    <Panel
      headerTemplate={headerTemplate}
      className='m-2 mt-8 ml-8 absolute top-2 left-2 w-4 h-12 z-5'
      toggleable
    >
      <p className="m-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
  </Panel>
  )
};
