import type { SupabaseClient } from '@supabase/supabase-js';
import type { LatLngTuple } from 'leaflet';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { TWeather } from '../types';

export type TAppContextProvider = {
	children: ReactNode;
};

export type TAppContext = {
	supabaseClient: SupabaseClient;
	coordinates: LatLngTuple;
	weatherData: TWeather;
	handleCitySelection: Dispatch<SetStateAction<LatLngTuple>>;
};
