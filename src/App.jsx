import Footer from './components/Footer'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import ScrollToTop from './components/ScrollToTop'
import ScrollTopArrow from './components/ScrollTopArrow'
import Homepage from './pages/Homepage'
import HostPage from './pages/HostPage'
import PropertySinglePage from './pages/PropertySinglePage'
import ForgotPassword from './pages/auth/ForgotPassword'
import Login from './pages/auth/Login'
import ResetPassword from './pages/auth/ResetPassword'
import Signup from './pages/auth/Signup'
import { Route, Routes, useLocation } from 'react-router-dom'
import Myaccount from './pages/dashboard/Myaccount'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import HostRedirect from './pages/auth/components/HostRedirect'

const App = () => {
  const location = useLocation()

  const hideLayoutRoutes = ["/host-redirect"]
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);
  
  return (
    <>
     {!shouldHideLayout && <Navbar />}
      <ScrollToTop />
      <ScrollTopArrow />
      
       <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/login' element={<PublicRoute> <Login /> </PublicRoute>} />
        <Route path='/signup' element={<PublicRoute> <Signup /> </PublicRoute>} />
        <Route path='/forgot-password' element={<PublicRoute> <ForgotPassword /> </PublicRoute>} />
        <Route path='/reset-password' element={<PublicRoute> <ResetPassword /> </PublicRoute>} />

        <Route path='/property/:slug' element={<PropertySinglePage /> } />

        <Route path='/hosts' element={<HostPage /> } />

        <Route path="/host-redirect" element={<HostRedirect />} />

        <Route path='/my-account' element={ <ProtectedRoute allowedRole="student" > <Myaccount /> </ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
        
      </Routes>

       {!shouldHideLayout && <Footer />}
    </>
  )
}

export default App