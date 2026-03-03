import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth()

  if (loading) return null

  if (isAuthenticated && user) {
    const role = user.role?.toLowerCase()
    if (role === "host" || role === "admin") {
      return <Navigate to="/redirect-dashboard" replace />
    }

    return <Navigate to="/my-account" replace />
  }

  return children
}

export default PublicRoute