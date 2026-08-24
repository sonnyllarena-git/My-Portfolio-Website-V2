import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AdminApp from './admin/AdminApp.jsx'
import './index.css'

const RootComponent = window.location.pathname.startsWith('/admin')
  ? AdminApp
  : App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>,
)
