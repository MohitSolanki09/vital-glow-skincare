import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import NotFoundPage from './NotFoundPage'
import './index.css'
import './cta.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {location.pathname === '/' || location.pathname === '/index.html' ? <App /> : <NotFoundPage />}
  </React.StrictMode>,
)
