import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createTheme } from '@mui/material'

// Main entry point for the application
// create the "App" component on the page

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
