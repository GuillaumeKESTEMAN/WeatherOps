import { PrimeReactProvider } from 'primereact/api';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { AppContextProvider } from './shared/AppContext/AppContextProvider';
import { Login } from './pages/Login';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';



createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AppContextProvider>
			<BrowserRouter>
				<PrimeReactProvider>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path='/login' element={<Login />} />
					</Routes>
				</PrimeReactProvider>
			</BrowserRouter>
		</AppContextProvider>
	</StrictMode>
);
