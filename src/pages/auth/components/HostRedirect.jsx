import { useEffect } from "react"
import { useAuth } from "../../../context/AuthContext"

const HostRedirect = () => {
  const { token } = useAuth();
  const WEBSITE_URL = import.meta.env.VITE_WEBSITE_URL;

  useEffect(() => {
  if (token) {
    // console.log("hello",{token})
    window.location.replace(
      `${WEBSITE_URL}/session-login?token=${token}`
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
      <div className="spinner-border text_blue mb-3" />
      <h4>Redirecting to the dashboard...</h4>
      <p>Please wait a moment</p>
    </div>
  )
}

export default HostRedirect