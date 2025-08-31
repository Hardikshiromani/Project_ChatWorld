import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
// import { getMessaging, getToken, onMessage } from './pages/firebase'; 
createRoot(document.getElementById('root')).render(
  <StrictMode>
     {/* <BrowserRouter> */}
     <HashRouter>
      <App />
    {/* </BrowserRouter> */}
</HashRouter>
  </StrictMode>
)
