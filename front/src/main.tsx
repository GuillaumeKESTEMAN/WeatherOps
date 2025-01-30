import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Home} from './Pages/Home'
import { Routes, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeflex/primeflex.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PrimeReactProvider>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </PrimeReactProvider>
    </BrowserRouter>
  </StrictMode>,
)
