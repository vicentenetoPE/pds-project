import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyles } from './GlobalStyles.ts'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <React.StrictMode>
    <GlobalStyles/>
    <App />
  </React.StrictMode>
  </BrowserRouter>,
)
