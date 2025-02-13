import { useContext } from 'react';
import { AppContext } from './AppContext';
import type { TAppContext } from './types';

export const useAppContext = () => useContext(AppContext) as TAppContext;
