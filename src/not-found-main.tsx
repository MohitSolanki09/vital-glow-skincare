import React from 'react'
import { createRoot } from 'react-dom/client'
import NotFoundPage from './NotFoundPage'
import './index.css'

createRoot(document.getElementById('root')!).render(<React.StrictMode><NotFoundPage /></React.StrictMode>)
