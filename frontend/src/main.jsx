import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ScrollToTop from "./pages/ScrollToTop.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <ScrollToTop />
  </BrowserRouter>
)
