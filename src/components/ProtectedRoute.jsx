import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"

const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, loading, user } = useAuth()

  if (loading) return null

  // Not logged in
  if (!isAuthenticated) {
    // toast.error("Please login to continue")
    return <Navigate to="/login" replace />
  }

  // Role restriction
  if (allowedRole && user?.role !== allowedRole) {
    // toast.error("This page is only available for students")
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute