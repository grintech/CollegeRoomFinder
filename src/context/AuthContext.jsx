import { createContext, useContext, useState, useEffect } from "react"
import api from "../services/api"
import toast from "react-hot-toast"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

 useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const isLogout = urlParams.get("logout")

  const storedToken = localStorage.getItem("token")
  const storedUser = localStorage.getItem("user")

  // If coming from dashboard logout
  if (isLogout === "true") {
    handleExternalLogout()
    return
  }

  if (storedToken) {
    setToken(storedToken)
    api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`
  }

  if (storedUser) {
    setUser(JSON.parse(storedUser))
  }

  setLoading(false)
}, [])

  const login = (token, userData) => {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(userData))

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`

    setToken(token)
    setUser(userData)
  }

  // Updated Logout with API
  const logout = async () => {
  const storedToken = localStorage.getItem("token")

  try {
    if (storedToken) {
      const response = await api.post( "/logout", {},
        {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        }
      )

      if (response?.data?.status === true) {
        toast.success(response.data.message || "Logged out successfully")
      }
    }
  } catch (error) {
    // Optional: console log only
    console.error("Logout API error:", error?.response?.data?.message)

    // toast.error(
    //   error?.response?.data?.message || "Logout failed"
    // )
    
  } finally {
    // Always clear local auth
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    delete api.defaults.headers.common["Authorization"]

    setUser(null)
    setToken(null)
  }
}


const handleExternalLogout = async () => {
  const storedToken = localStorage.getItem("token")

  try {
    if (storedToken) {
      await api.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        }
      )
    }
  } catch (error) {
    console.error("External logout API error:", error?.response?.data?.message)
  } finally {
    //  Clear local storage
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    delete api.defaults.headers.common["Authorization"]

    setUser(null)
    setToken(null)

    //  Remove ?logout=true and refresh clean homepage
    window.location.replace(window.location.origin)

     // Remove ?logout from URL without reload
    //  window.history.replaceState({}, document.title, window.location.pathname)
  }
}


  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
        isAuthenticated: !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)