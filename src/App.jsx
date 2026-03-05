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
import SavedListings from './pages/dashboard/SavedListings'
import Profile from './pages/dashboard/Profile'
import ContactedHosts from './pages/dashboard/ContactedHosts'
import BookedTours from './pages/dashboard/BookedTours'
import SavedSearches from './pages/dashboard/SavedSearches'
import { ListingsPage } from './pages/ListingsPage'
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import CommunityRules from './pages/CommunityRules'

const App = () => {
  const location = useLocation()

  const hideLayoutRoutes = ["/redirect-dashboard"]
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
        {/* <Route path='/listings' element={<ListingsPage /> } /> */}

        <Route path='/hosts' element={<HostPage /> } />
        <Route path="/redirect-dashboard" element={<HostRedirect />} />


        {/* <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/community-rules" element={<CommunityRules />} /> */}


        {/* Dashboard Pages  */}

        <Route path='/my-account' element={ <ProtectedRoute allowedRole="student" > <Myaccount /> </ProtectedRoute>} />
        <Route path='/profile' element={ <ProtectedRoute allowedRole="student" > <Profile /> </ProtectedRoute>} />
        <Route path='/saved-listings' element={ <ProtectedRoute allowedRole="student" > <SavedListings /> </ProtectedRoute>} />
        <Route path='/booked-tours' element={ <ProtectedRoute allowedRole="student" > <BookedTours /> </ProtectedRoute>} />
        <Route path='/contacted-hosts' element={ <ProtectedRoute allowedRole="student" > <ContactedHosts /> </ProtectedRoute>} />
        <Route path='/saved-searches' element={ <ProtectedRoute allowedRole="student" > <SavedSearches /> </ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
        
      </Routes>

       {!shouldHideLayout && <Footer />}
    </>
  )
}

export default App