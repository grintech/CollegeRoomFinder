import { useState } from 'react'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
            <div className="auth-page d-flex align-items-center justify-content-center">
            <div className="auth-card">
                <div className="text-center mb-4 auth_header">
                    <Link to="/">
                    <img src="/images/logo_new.png" className="logo mb-4" />
                    </Link>
                <h1 className="mb-1">Welcome Back</h1>
                <p className="text-muted ">
                    Sign in to your account
                </p>
                </div>

                <form>
                {/* Email */}
                <div className="mb-3">
                    <label>
                    Email <span className="text-danger">*</span>
                    </label>
                    <div className="input-icon">
                    <Mail size={18} />
                    <input
                        type="email"
                        className="form-control"
                        placeholder="you@example.com"
                    />
                    </div>
                </div>

                {/* Password */}
                <div className="mb-3">
                    <label>
                    Password <span className="text-danger">*</span>
                    </label>
                    <div className="input-icon password-field">
                    {/* Lock icon (clickable) */}
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
                    />

                    {/* Eye icon */}
                    <span
                        className="eye"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ?  <Eye size={18} /> : <EyeOff size={18} />}
                    </span>
                    </div>
                </div>

                <button className="blue_btn w-100">Sign In</button>

                {/* Forgot & Signup links */}
                <div className="d-flex flex-column text-center mt-3  gap-2">
                <Link to="/forgot-password" className="d-block mb-1 text_blue">
                    Forgot your password?
                </Link>
                <span>
                    Don’t have an account? <Link to="/signup" className='text_blue'>Sign Up</Link>
                </span>
                </div>

                </form>

                <p className="terms text-center mt-4 small mb-0">
                By continuing, you agree to our <Link to="#">Terms of Service</Link> and{' '}
                <Link to="#">Privacy Policy</Link>
                </p>
            </div>
            </div>
    </>
  )
}

export default Login
