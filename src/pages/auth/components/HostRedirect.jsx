import { useEffect } from "react"
import { useAuth } from "../../../context/AuthContext"

const HostRedirect = () => {
  const { token } = useAuth()

  useEffect(() => {
  if (token) {
    window.location.replace(
      `https://roomfinder.grincloudhost.com/session-login?token=${token}`
    )
  }
}, [token])

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      background: "#f8f9fa"
    }}>
      <div className="spinner-border text-primary mb-3" />
      <h4>Redirecting to Host Panel...</h4>
      <p>Please wait a moment</p>
    </div>
  )
}

export default HostRedirect