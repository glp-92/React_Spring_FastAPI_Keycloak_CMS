import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Router } from './router/Router'
import { mainTheme } from './themes/mainTheme'
import { ThemeProvider } from '@mui/material/styles';


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <ThemeProvider theme={mainTheme}>
      <Router />
    </ThemeProvider>
  </React.StrictMode>,
)
