import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <AuthProvider>
      <App />
      <Toaster 
        position="top-right"
        // toastOptions={{ style: { zIndex: 99999 } }}
       />
    </AuthProvider>
    </BrowserRouter>
  
)
