import { useState } from 'react'
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

const ResetPassword = () => {
  const { token } = useParams() // for future API use
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <>
        <div className="auth-page d-flex align-items-center justify-content-center">
        <div className="auth-card">
            <div className="text-center mb-4">
            <img src="/images/logo_new.png" className="logo mb-4" />
            <h1 className="mb-1">Reset Password</h1>
            <p className="text-muted small">
                Create a new password for your account
            </p>
            </div>

            <form>
            {/* New Password */}
            <div className="mb-3">
                <label>New Password <span className="text-danger">*</span></label>
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
                />

                <span
                    className="eye"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
                </div>
                <small className="text-muted">
                Must be at least 8 characters
                </small>
            </div>

            {/* Confirm Password */}
            <div className="mb-3">
                <label>Confirm Password <span className="text-danger">*</span></label>
                <div className="input-icon password-field">
                <span
                    className="lock"
                    onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                    }
                >
                    <Lock size={18} />
                </span>

                <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="••••••••"
                />

                <span
                    className="eye"
                    onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                    }
                >
                    {showConfirmPassword ? (
                    <EyeOff size={18} />
                    ) : (
                    <Eye size={18} />
                    )}
                </span>
                </div>
            </div>

            <button className="blue_btn w-100">
                Reset Password
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
    </>
  )
}

export default ResetPassword
