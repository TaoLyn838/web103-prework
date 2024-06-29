import React from 'react'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'))

root.render(
  <Router>
    <App />
  </Router>
)
