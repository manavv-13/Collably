import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LoaderState from './context/loader/LoaderState.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoaderState>
    <App />
    </LoaderState>
  </StrictMode>,
)
