import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Home} from './Pages/Home'
import { Routes, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
