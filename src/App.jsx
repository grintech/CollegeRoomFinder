import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import ScrollTopArrow from './components/ScrollTopArrow'
import Homepage from './pages/Homepage'
import PropertySinglePage from './pages/PropertySinglePage'
import ForgotPassword from './pages/auth/ForgotPassword'
import Login from './pages/auth/Login'
import ResetPassword from './pages/auth/ResetPassword'
import Signup from './pages/auth/Signup'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <ScrollTopArrow />
      
       <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        <Route path='/property/:slug' element={<PropertySinglePage /> } />
      </Routes>

      <Footer />
    </>
  )
}

export default App