import { useState, useEffect } from 'react'
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import toast from 'react-hot-toast'

const ResetPassword = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const token = searchParams.get("token")
  const email = searchParams.get("email")

  // Redirect if token/email missing
  useEffect(() => {
    if (!token || !email) {
      navigate("/forgot-password")
    }
  }, [token, email, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!password || !confirmPassword) {
      toast.error("All fields are required")
      return
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters")
      return
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    try {
      setLoading(true)

      const response = await api.post("/reset-password", {
        email,
        token,
        password,
        password_confirmation: confirmPassword
      })

      if (response?.data?.status === true) {
        toast.success(response.data.message || "Password reset successful")

        setTimeout(() => {
          navigate("/login")
        }, 1500)
      } else {
        toast.error(response?.data?.message || "Something went wrong")
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page d-flex align-items-center justify-content-center">
      <div className="auth-card">
        <div className="text-center mb-4">
          <img src="/images/logo_new.png" className="logo mb-4" />
          <h1 className="mb-1">Reset Password</h1>
          <p className="text-muted small">
            Create a new password for your account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* New Password */}
          <div className="mb-3">
            <label>New Password <span className="text-danger">*</span></label>
            <div className="input-icon password-field">
              <span className="lock" onClick={() => setShowPassword(!showPassword)}>
                <Lock size={18} />
              </span>

              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span className="eye" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            <small className="text-muted">
              Must be at least 6 characters
            </small>
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label>Confirm Password <span className="text-danger">*</span></label>
            <div className="input-icon password-field">
              <span
                className="lock"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Lock size={18} />
              </span>

              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <span
                className="eye"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="blue_btn w-100"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/login" className="back-link">
            <ArrowLeft size={16} className="me-1" />
            Back to Login
          </Link>
        </div>

        <p className="terms text-center mt-4 small">
          By continuing, you agree to our <Link to="#">Terms of Service</Link> and{' '}
          <Link to="#">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}

export default ResetPassword