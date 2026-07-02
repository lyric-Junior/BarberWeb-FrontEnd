import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Login from './Login.jsx'
import Panel from './pages/panel.jsx'
import CPanel from './pages/CPanel.jsx'

import { BrowserRouter, Route, Routes } from 'react-router'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' Component={Login} />
      <Route path='/panel' Component={Panel} />
      <Route path='/CPanel' Component={CPanel}/>
    </Routes>
  </BrowserRouter>
)
