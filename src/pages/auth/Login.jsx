import { useState } from 'react'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('All fields are required')
      return
    }

    setLoading(true)

    try {
      const response = await api.post('/login', {
        email,
        password
      })

      if (response?.data?.status === true) {

        const token = response.data.token
        const userData = response.data.user

        // Save auth first
        login(token, userData)

        toast.success(response.data.message || "Login successful")
       if (["host", "admin"].includes(userData.role)) {
          navigate("/redirect-dashboard", { replace: true })
        } else {
          navigate("/my-account")
       }

    } else {
        toast.error(response?.data?.message || 'Login failed')
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Something went wrong'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page d-flex align-items-center justify-content-center">
      <div className="auth-card">
        <div className="text-center mb-4 auth_header">
          <Link to="/">
            <img src="/images/logo_new.png" className="logo mb-4" />
          </Link>
          <h1 className="mb-1">Welcome Back</h1>
          <p className="text-muted">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label>Email <span className="text-danger">*</span></label>
            <div className="input-icon">
              <Mail size={18} />
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label>Password <span className="text-danger">*</span></label>
            <div className="input-icon password-field">
              <span
                className="lock"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Lock size={18} />
              </span>

              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="blue_btn w-100"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Forgot & Signup links */}
          <div className="d-flex flex-column text-center mt-3 gap-2">
            <Link to="/forgot-password" className="text_blue">
              Forgot your password?
            </Link>
            <span>
              Don’t have an account?{' '}
              <Link to="/signup" className="text_blue">
                Sign Up
              </Link>
            </span>
          </div>
        </form>

        <p className="terms text-center mt-4 small mb-0">By continuing, you agree to our <Link to="/terms-and-conditions" >Terms of Service</Link> and <Link to="/privacy-policy" >Privacy Policy</Link></p>
      </div>
    </div>
  )
}

export default Login