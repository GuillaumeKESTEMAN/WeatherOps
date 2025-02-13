import { PrimeReactProvider } from 'primereact/api';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { AppContextProvider } from './shared/AppContext/AppContextProvider';

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
					</Routes>
				</PrimeReactProvider>
			</BrowserRouter>
		</AppContextProvider>
	</StrictMode>
);
