import { Mail, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import api from '../../services/api'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email) {
        toast.error("Email is required")
        return
        }

        try {
        setLoading(true)

        const response = await api.post("/forgot-password", {
            email
        })

        if (response?.data?.status === true) {
            toast.success(
            response.data.message || "Reset link sent to your email"
            )
            setEmail("")
        } else {
            toast.error(
            response?.data?.message || "Something went wrong"
            )
        }
        } catch (error) {
        toast.error(
            error?.response?.data?.message || "Something went wrong"
        )
        } finally {
        setLoading(false)
        }
  }


  return (
    <>
        <div className="auth-page d-flex align-items-center justify-content-center">
        <div className="auth-card">
            <div className="text-center mb-4">
           <Link to="/" ><img src="/images/logo_new.png" className="logo mb-4" /></Link> 
            <h1 className="mb-1">Forgot Password</h1>
            <p className="text-muted small">
                Enter your email and we’ll send you a reset link
            </p>
            </div>

            <form onSubmit={handleSubmit}>
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

             <button
                type="submit"
                className="blue_btn w-100"
                disabled={loading}
             >
                {loading ? "Sending..." : "Send Reset Link"}
             </button>
            </form>

            <div className="text-center mt-3">
            <Link to="/login" className="back-link">
                <ArrowLeft size={16} className="me-1" />
                Back to Login
            </Link>
            </div>

            <p className="terms text-center mt-4 small mb-0">
            By continuing, you agree to our <Link to="#">Terms of Service</Link> and{' '}
            <Link to="#">Privacy Policy</Link>
            </p>
        </div>
        </div>
    </>
  )
}

export default ForgotPassword
