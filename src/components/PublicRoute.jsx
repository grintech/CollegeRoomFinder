import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth()

  if (loading) return null

  if (isAuthenticated && user) {
    if (user.role === "host") {
      return <Navigate to="/host-redirect" replace />
    }

    return <Navigate to="/my-account" replace />
  }

  return children
}

export default PublicRoute